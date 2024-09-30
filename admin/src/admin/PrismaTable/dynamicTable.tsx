import React, { useContext, useEffect, useState } from 'react';
import { ApolloError, QueryLazyOptions, useLazyQuery, useMutation } from '@apollo/client';

// import Modal from '../components/Modal';
import { Table } from './Table';
import { useFilterAndSort } from './Table/useFilterAndSort';
import Form from './Form';
import { TableContext } from './Context';
import EditRecord from './EditRecord';
import { mutationDocument, queryDocument } from './QueryDocument';
import { ContextProps, TableParentRecord } from '..';

import { makeStyles } from '@mui/styles';
import Card from '@mui/material/Card';

import Modal from '@mui/material/Modal';
import Backdrop from '@mui/material/Backdrop';
import Fade from '@mui/material/Fade';
import Box from '@mui/material/Box';
import { useRouter } from 'next/router'
// const useStyles = makeStyles((theme) => ({
//   modal: {
//     display: 'flex',
//     alignItems: 'center',
//     justifyContent: 'center',
//   },
// }));

export interface DynamicTableProps {
  parent?: TableParentRecord;
  inEdit?: boolean;
  model: string;
  filter?: unknown;
  connect?: any;
  headerActions?: any;
  onConnect?: (value: any) => void;
  children?:
  | ((options: {
    context: ContextProps;
    query: {
      variables: {
        where: any;
        orderBy?: any[];
        take: number;
        skip: number;
      };
      data?: any;
      loading: boolean;
      error?: ApolloError;
      getData: (
        options?: QueryLazyOptions<{
          take: number;
          skip: number;
          where: any;
          orderBy: any[] | undefined;
        }>
      ) => void;
    };
  }) => React.ReactNode)
  | null;
}
const DynamicTable: React.FC<DynamicTableProps> = ({
  model,
  inEdit,
  filter,
  parent,
  connect,
  onConnect,
  children,
  headerActions,
  ui: relationUI,
  enableBack
}) => {
  const router = useRouter()
  const context = useContext(TableContext);
  const {
    schema: { models },
    query,
    onCancelCreate,
    onSaveCreate,
    onSaveUpdate,
    push,
    pagesPath,
    pageSize,
  } = context;
  // const ui = pagesPath?.length > 0 && !!model ? require(`pages/admin/Organization/Organization/${model}`)?.[`${model}UI`] : null;
  const ui = relationUI ? relationUI : pagesPath?.length > 0 && !!model ? require('../../pages' + pagesPath + model + ".tsx")?.[`${model}UI`] : null;

  const [page, setPage] = useState({
    take: pageSize,
    skip: 0,
  });
  const [create, setCreate] = useState(router?.query?.create);
  const [modalUpdateItem, setModalUpdateItem] = useState(null);

  const modelObject = models.find((item) => item.id === model);

  const { where, orderBy, filterHandler, sortByHandler, initialFilter } = useFilterAndSort(
    model,
    inEdit ? filter : query
  );
  const generateWhere = (where) => {
    // if (typeof where === 'object') {
    //   let newWhere = JSON.parse(JSON.stringify(where))
    //   console.log(newWhere, 'newWhere')
    //   Object.keys(where).map((key) => {
    //     console.log(where?.[key]?.['equals'], 'newWhere2')

    //     if (where?.[key]?.['equals'] === false) {
    //       // newWhere[key].not = {
    //       //   equals: true
    //       // }
    //       newWhere[key].equals = null
    //       delete newWhere[key].equals
    //     }
    //   })
    //   return {
    //     ...newWhere,
    //     ...(ui?.extraWhere ? { ...ui.extraWhere } : undefined),
    //   }
    // }
    if (typeof where === 'object') {
      let orWhere = {
        OR: [{
          ...where,
          ...(ui?.extraWhere ? { ...ui.extraWhere } : undefined),
        }]
      }
      let newWhere = JSON.parse(JSON.stringify(orWhere?.OR?.[0]))
      Object.keys(newWhere).map((key) => {
        if (newWhere?.[key]?.['equals'] === false) {
          newWhere[key].equals = null
          orWhere.OR.push(newWhere)
        }
      })
      return orWhere
    }
    return {
      ...where,
      ...(ui?.extraWhere ? { ...ui.extraWhere } : undefined),
    }
  }

  const variables = {
    where: generateWhere(where),
    orderBy: orderBy ? orderBy : [{
      createdAt: {
        sort: 'desc'
      }
    }],
    ...page,
  };

  const [getData, { data, loading, error }] = useLazyQuery(queryDocument(models, model), {
    variables,
    fetchPolicy: 'no-cache',
  });

  useEffect(() => {
    if (error) {
      console.log(error)
      // window.location.assign('/admin');
    }
  }, [error]);

  const [deleteOne] = useMutation(mutationDocument(models, model, 'delete'));

  useEffect(() => {
    let timeOut: NodeJS.Timeout;
    if ((!(query?.update || query?.view) || inEdit) && !data && !loading && !error) {
      timeOut = setTimeout(() => {
        getData();
      }, 5);
    }
    return () => {
      clearTimeout(timeOut);
    };
  }, [data, loading, query]);

  const fetchMoreHandler = (pageSize: number, pageIndex: number) => {
    if (pageSize !== page.take || pageSize * pageIndex !== page.skip) {
      setPage({
        take: pageSize,
        skip: pageSize * pageIndex,
      });
    }
  };

  const onAction = (action: 'create' | 'delete' | 'connect' | 'update', value?: unknown) => {
    switch (action) {
      case 'delete':
        if (modelObject) {
          deleteOne({
            variables: {
              where: {
                [modelObject.idField]: value,
              },
            },
          }).then(() => {
            getData();
          });
        }
        break;
      case 'create':
        setCreate(true);
        break;
      case 'update':
        setModalUpdateItem(value);
        break;
      case 'connect':
        if (onConnect) {
          onConnect(value);
        }
        break;
    }
  };

  const onCreateCancel =
    onCancelCreate ||
    function () {
      setCreate(false);
    };

  // const onCreateSave = ({ model, data, setCreateModal, refetchTable }) => {
  //   if (onSaveCreate) {
  //     onSaveCreate({ model, data, setCreateModal, refetchTable });
  //   } else {
  //     setCreate(false);
  //     parent?.updateRecord && parent.updateRecord();
  //     getData();
  //   }
  // };

  // const onUpdateSave = ({ model, data, refetchTable }) => {
  //   if (onSaveUpdate) {
  //     onSaveUpdate({ model, data, refetchTable });
  //   } else {
  //     if (query?.redirect) {
  //       push(decodeURIComponent(query.redirect));
  //     } else {
  //       push(pagesPath + model);
  //       getData();
  //     }
  //   }
  // };

  const onCreateSave =
    onSaveCreate ||
    function ({ data }) {
      setCreate(false);
      parent?.updateRecord && parent.updateRecord();
      getData();
      if (!parent) {
        router.push(`${pagesPath}${model}?${modelObject?.update ? 'update' : 'view'}=${data.id}`)
      }
    };

  const onUpdateSave =
    onSaveUpdate ||
    function () {
      if (query?.redirect) {
        push(decodeURIComponent(query.redirect));
        // } else {
        //   push(pagesPath + model);
        //   getData();
      } else {
        // window.location.reload()
      }
    };

  const parentName = modelObject?.fields.find((item) => item.type === parent?.name)?.name;
  const _data: any[] = data ? data[`findMany${model}`] : [];
  const CreateFormComponent = ui?.createFormComponent;
  // const classes = useStyles();
  return (
    <>
      {children &&
        children({
          context,
          query: { variables, data, getData, loading, error },
        })}
      <Modal
        open={create}
        onClose={() => setCreate(!create)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card sx={{
          background: '#F7F7F7',
          width: {
            xs: '90%',
            md: '60%'
          },
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '30px',
          height: '90%',
          overflow: 'scroll',
          padding: '40px'
        }}>
          {create && CreateFormComponent && <CreateFormComponent
            ui={ui}
            model={model}
            action="create"
            data={inEdit && parentName ? { [parentName]: parent?.value } : {}}
            onCancel={() => onCreateCancel({ model, setCreateModal: setCreate })}
            onSave={(data) =>
              onCreateSave({
                data,
                model,
                setCreateModal: setCreate,
                refetchTable: getData,
                parent,
                getData,
              })
            }
          />}
        </Card>
      </Modal>
      <Modal
        open={modalUpdateItem}
        onClose={() => setModalUpdateItem(null)}
        closeAfterTransition
        BackdropComponent={Backdrop}
        BackdropProps={{
          timeout: 500,
        }}
      >
        <Card sx={{
          background: '#F7F7F7',
          width: {
            xs: '90%',
            md: '60%'
          },
          marginLeft: 'auto',
          marginRight: 'auto',
          marginTop: '30px',
          height: '90%',
          overflow: 'scroll',
          padding: '40px'
        }}>
          <EditRecord
            enableBack={false}
            ui={ui}
            model={model}
            update={modelObject?.update ? modalUpdateItem : null}
            view={!modelObject?.update ? modalUpdateItem : null}
            onSave={(data) => onUpdateSave({ data, model, parent, getData, refetchTable: getData })}
          />
        </Card>
      </Modal>
      {(query?.update || query?.view) && !inEdit ? (
        <EditRecord
          enableBack={enableBack}
          ui={ui}
          model={model}
          update={query.update}
          view={query?.view}
          onSave={(data) => onUpdateSave({ data, model, parent, getData, refetchTable: getData })}
        />
      ) : !!create ? null : (
        <Table
          enableBack={enableBack}
          refetchTable={getData}
          ui={ui}
          getData={getData}
          parent={parent}
          connect={connect}
          inEdit={inEdit}
          onAction={onAction}
          headerActions={headerActions}
          model={model}
          data={
            connect && Object.keys(connect).length > 0
              ? [connect].concat(
                _data.filter(
                  (item) =>
                    modelObject && item[modelObject.idField] !== connect[modelObject.idField]
                )
              )
              : _data
          }
          fetchMore={fetchMoreHandler}
          loading={loading}
          filterHandler={filterHandler}
          sortByHandler={sortByHandler}
          initialFilter={initialFilter}
          pageCount={data ? Math.ceil(data[`findMany${model}Count`] / page.take) : 0}
        />
      )}
    </>
  );
};

export default DynamicTable;
