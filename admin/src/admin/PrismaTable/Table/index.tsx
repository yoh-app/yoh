import React, { Fragment, useContext, useState, useEffect } from 'react';
import { usePagination, useSortBy, useTable } from 'react-table';

import { columns } from './Columns';
import { initPages } from './utils';
import { TableContext } from '../Context';
import Spinner from '../../components/Spinner';
import Checkbox from '../../components/Checkbox';
import { ListConnect } from './ListConnect';
import { PencilAltIcon, EyeIcon, TrashIcon, PlusIcon } from '@heroicons/react/outline';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router'
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  ChevronDoubleLeftIcon,
  ChevronDoubleRightIcon,
  ArrowNarrowDownIcon,
  ArrowNarrowUpIcon,
  SearchCircleIcon,
  SearchIcon,
  XIcon
} from '@heroicons/react/solid';
import { Filter } from './Filters';
import { buttonClasses, classNames } from '../../components/css';
import { Popover, Transition } from '@headlessui/react';
import { TableParentRecord } from '../..';
import HeaderDashboard from 'components/HeaderDashboard';
import { usePermissionQuery } from 'generated';
import { mutationDocument, queryDocument } from '../QueryDocument';
import { ApolloError, QueryLazyOptions, useLazyQuery, useMutation } from '@apollo/client';
import TextField from '@mui/material/TextField';
import { CardContent, Card, Grid, Button, Popper } from '@mui/material';

interface TableProps {
  getData: () => void;
  inEdit?: boolean;
  model: string;
  data: any[];
  fetchMore: (pageSize: number, pageIndex: number) => void;
  loading: boolean;
  pageCount: number;
  initialFilter: { id: string; value: any }[];
  sortByHandler: (sortBy: { id: string; desc: boolean }[]) => void;
  filterHandler: (filters: { id: string; value: any }[]) => void;
  onAction: (action: 'create' | 'delete' | 'connect', value?: unknown) => void;
  connect?: any;
  parent?: TableParentRecord;
}

export const Table: React.FC<TableProps> = ({
  initialFilter,
  model: modelName,
  data,
  fetchMore,
  loading,
  pageCount: controlledPageCount,
  sortByHandler,
  filterHandler,
  onAction,
  inEdit,
  connect,
  parent,
  getData,
  headerActions,
  ui,
  refetchTable,
  enableBack,
}) => {
  const { t } = useTranslation('generated');
  const { t: tAdmin } = useTranslation('admin');
  const router = useRouter()
  // const { data: permissionData, loading: permissionLoading } = usePermissionQuery();

  const {
    websiteData,
    permissionData,
    schema: { models },
    push,
    pagesPath,
    pageSize: defaultPageSize,
    pageSizeOptions,
    paginationOptions,
    tableColumns,
    onSelect,
    actions: userActions,
    actionButtons,
    lang,
    dir,
    query
  } = useContext(TableContext);
  const model = models.find((item) => item.id === modelName);

  const columnList = columns(model, tableColumns, ui, t, websiteData);
  const tableInstance = useTable(
    {
      columns: columnList,
      data,
      initialState: {
        pageIndex: 0,
        pageSize: defaultPageSize,
        filters: initialFilter,
      }, // Pass our hoisted table state
      manualFilters: true,
      manualSortBy: true,
      manualPagination: true,
      pageCount: controlledPageCount,
    } as any,
    useSortBy,
    usePagination
  );

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize, sortBy },
  } = tableInstance as any;

  const [selected, setSelected] = useState<number[]>([]);
  const [filters, setFilters] = useState(initialFilter);
  // Listen for changes in pagination and use the state to fetch our new data

  const onSelectHandler = (state: boolean, id?: any) => {
    let newValues: any[];
    if (!state && !id) {
      newValues = [];
      setSelected(newValues);
    } else if (state && !id && model) {
      newValues = data.map((row) => row[model.idField]);
      setSelected(newValues);
    } else if (!state && id) {
      newValues = selected.filter((value) => value !== id);
      setSelected(newValues);
    } else {
      newValues = [...selected, id];
      setSelected(newValues);
    }
    onSelect && onSelect(newValues);
  };

  React.useEffect(() => {
    fetchMore(pageSize, pageIndex);
  }, [fetchMore, pageIndex, pageSize]);

  React.useEffect(() => {
    sortByHandler(sortBy);
  }, [sortBy]);

  const setAllFilters = (filters: { id: string; value: any }[]) => {
    filterHandler(filters);
    setFilters(filters);
  };

  const actions = userActions
    ? {
      create: userActions.includes('create'),
      update: userActions.includes('update'),
      delete: userActions.includes('delete'),
    }
    : {
      create: model?.create,
      update: model?.update,
      delete: model?.delete,
    };

  const [deleteMany] = useMutation(mutationDocument(models, modelName, 'deleteMany'));

  const ActionButtons = {
    Add: () => (
      <>
        <Button onClick={() => onAction('create')}>
          <PlusIcon className="h-5 w-5" />&nbsp;{tAdmin('new')}
        </Button>
        {/* <button
        type="button"
        className={classNames(
          buttonClasses,
          'h-full rounded-lg py-2 px-2 bg-blue text-white shadow hover:text-yellow-400'
        )}
        onClick={() => onAction('create')}
      >
        <PlusIcon className="h-5 w-5" />
      </button> */}
      </>
    ),
    Update: ({ id }: { id: any }) => (
      <>
        {/* <button
          type="button"
          className={classNames(
            buttonClasses,
            'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
          )}
          onClick={() =>
            model && push(`${pagesPath}${modelName}?${actions.update ? 'update' : 'view'}=${id}`)
          }
        >
          {actions.update ? <PencilAltIcon className="h-5 w-5" /> : <EyeIcon className="h-5 w-5" />}
        </button> */}
        <Button
          style={{ minWidth: '30px' }}
          onClick={() => {
            if (parent) {
              console.log(parent, id, modelName)
              onAction('update', id)
            } else {
              model && push(`${pagesPath}${modelName}?${actions.update ? 'update' : 'view'}=${id}`)
            }
          }
          }
        >
          {actions.update ? <PencilAltIcon className="h-5" /> : <EyeIcon className="h-5" />}
        </Button>
      </>
    ),
    Delete: ({ id }: { id: any }) => (
      <>
        <Button
          style={{ color: 'red', minWidth: '30px' }}
          onClick={() => {
            const confirm = window.confirm(lang.deleteConfirm);
            if (confirm && model) onAction('delete', id);
          }}
        >
          <TrashIcon className="h-5" />
        </Button>
        {/* <button
          type="button"
          className={classNames(
            buttonClasses,
            'bg-transparent text-red-600 hover:bg-blue-100 hover:bg-opacity-25'
          )}
          onClick={() => {
            const confirm = window.confirm(lang.deleteConfirm);
            if (confirm && model) onAction('delete', id);
          }}
        >
          <TrashIcon className="h-5 w-5" />
        </button> */}
      </>
    ),
    DeleteMany: ({ ids }: { ids: any }) => (
      <>
        <Button
          variant="contained"
          onClick={async () => {
            const confirm = window.confirm(lang.deleteConfirm);
            if (confirm && model) {
              await deleteMany({
                variables: {
                  where: {
                    id: {
                      in: ids,
                    },
                  },
                },
              });
              await refetchTable();
            }
          }}
        >
          <TrashIcon className="h-5 w-5" />
        </Button>
        {/* <button
        type="button"
        className={classNames(
          buttonClasses,
          'h-full rounded-lg py-2 px-2 bg-blue text-white shadow hover:text-yellow-400'
        )}
        onClick={async () => {
          const confirm = window.confirm(lang.deleteConfirm);
          if (confirm && model) {
            await deleteMany({
              variables: {
                where: {
                  id: {
                    in: ids,
                  },
                },
              },
            });
            await refetchTable();
          }
        }}
      >
        <TrashIcon className="h-5 w-5" />
      </button> */}
      </>
    ),
    ...actionButtons,
  };
  const isSelect = onSelect && !inEdit;

  const hasFilters = filters.length > 0;
  // const hasFilters = false;

  const parentModel = models.find((item) => item.id === parent?.name);
  const fieldUpdate = parentModel?.fields.find((f) => f.name === parent?.field)?.update;
  // Render the UI for your table

  const thClasses =
    'px-4 py-2 text-center text-sm font-medium text-gray-500 whitespace-nowrap tracking-wider overflow-hidden overflow-ellipsis';
  const tdClasses =
    'px-4 py-2 text-center whitespace-nowrap overflow-hidden overflow-ellipsis text-gray-500';
  const TableComponent = ui?.tableComponent;

  const links = [
    { name: permissionData?.admin },
    { name: t(ui.intl['titleId']), href: pagesPath + model?.name },
  ];
  const omitParentFilters = filters.filter(
    (_filter) =>
      _filter?.id?.toLowerCase() !== parent?.name?.toLowerCase() &&
      _filter?.id?.replace(/s$/, '').toLowerCase() !== parent?.name?.toLowerCase()
  );

  // useEffect(() => {
  //   if (parent) {
  //     setAllFilters([]);
  //   }
  // }, []);
  // console.log('data: ', data)
  useEffect(() => {
    // if (ui?.hideConnect && parent) {
    //   setAllFilters(initialFilter);
    // } else if (parent) {
    //   setAllFilters([]);
    // }
    if (parent) {
      setAllFilters(initialFilter);
    }
  }, [ui, parent])
  const [anchorEl, setAnchorEl] = useState(null)
  return (
    <>
      {!connect && !parent && (
        <HeaderDashboard
          model={model}
          enableBack={enableBack}
          links={links}
          heading={t(ui.crudIntl['listTitleId'])}
          description={t(ui.crudIntl['listDescriptionId'])}
        />
      )}

      {headerActions}
      <div style={{ display: 'flex', marginBottom: '30px' }}>
        {/* {model?.fields?.find((field) => field.name === 'name') && permissionData?.permission?.admin === 'Website' && (
                <TextField
                  placeholder={tAdmin('searchName')}
                  size="small"
                  onChange={(e) => {
                    if (e.target.value.length > 0) {
                      setAllFilters([...initialFilter, { id: 'name', value: { contains: e.target.value } }]);
                    } else {
                      setAllFilters(initialFilter);
                    }
                  }}
                />
              )}*/}
        {actions.create && !connect && !ui?.hideCreate && (
          <div style={{ marginRight: '10px' }}>
            <ActionButtons.Add />
          </div>
        )}
        {permissionData?.admin !== 'User' && <div>
          <Button variant='outlined' onClick={(event) => {
            setAnchorEl(anchorEl ? null : event.currentTarget);
          }}>
            {!!anchorEl ? <><XIcon className="h-5 w-5" />{tAdmin('close')}</> :
              <><SearchIcon className="h-5 w-5" />{tAdmin('search')}
                {!!omitParentFilters.length && (
                  <span
                    className={classNames(
                      'rounded-full bg-black text-white px-2',
                      dir === 'rtl' ? 'mr-2' : 'ml-2'
                    )}
                  >
                    {omitParentFilters.length}
                  </span>
                )}</>}
          </Button>
          <Popper style={{ zIndex: 1300 }} placement='bottom-start' open={!!anchorEl} anchorEl={anchorEl}>
            {model && (
              <Filter filters={omitParentFilters} setAllFilters={setAllFilters} model={{
                ...model,
                fields: model?.fields.map((field, index) => {
                  let filter = false
                  let uiFormField = null
                  ui.forms.forEach(form => {
                    form?.formFields?.forEach(formField => {
                      if (formField.name === field.name && field.type !== 'Json' && !field.name.endsWith('Id')) {
                        filter = true
                        uiFormField = formField
                        // model.fields[index] = {
                        //   ...model.fields[index],
                        //   filter: true
                        // }
                      }
                    });
                  });
                  return {
                    ...field,
                    uiFormField,
                    filter
                  }
                }).filter((field) => {
                  switch (model?.name) {
                    case 'Product':
                      if (websiteData?.paymentMethod === 'crypto') {
                        if (field.name === 'stripeFee') {
                          return false
                        }
                      }
                      break;
                    case 'Order':
                      if (websiteData?.paymentMethod === 'stripe') {
                        if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
                          return false
                        }
                      } else if (websiteData?.paymentMethod === 'crypto') {
                        if (field?.name === 'stripeFee') {
                          return false
                        }
                      }
                      break;
                    case 'Request':
                      if (websiteData?.paymentMethod === 'stripe') {
                        if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
                          return false
                        }
                      } else if (websiteData?.paymentMethod === 'crypto') {
                        if (field?.name === 'stripeFee') {
                          return false
                        }
                      }
                      break;

                      break;

                    default:
                      break;
                  }

                  return true;
                })
              }} />
            )}
          </Popper></div>}

        {/* <Popover
                style={{ display: 'flex', justifyContent: 'right', marginBottom: '10px' }}
              >
                <Popover.Button
                  style={{ fontSize: '15px' }}
                  className={classNames(
                    buttonClasses,
                    'flex items-center rounded-lg py-2 px-4 bg-black text-white shadow'
                  )}
                >
                  <SearchIcon className="h-5 w-5" />{tAdmin('search')}
                  {!!omitParentFilters.length && (
                    <span
                      className={classNames(
                        'rounded-full bg-yellow-400 px-2',
                        dir === 'rtl' ? 'mr-2' : 'ml-2'
                      )}
                    >
                      {omitParentFilters.length}
                    </span>
                  )}
                </Popover.Button>
                <Transition
                  as={Fragment}
                  enter="transition ease-out duration-200"
                  enterFrom="opacity-0 translate-y-1"
                  enterTo="opacity-100 translate-y-0"
                  leave="transition ease-in duration-150"
                  leaveFrom="opacity-100 translate-y-0"
                  leaveTo="opacity-0 translate-y-1"
                >
                  <Popover.Panel className="absolute z-10 mt-1">
                    {model && (
                      <Filter filters={omitParentFilters} setAllFilters={setAllFilters} model={{
                        ...model,
                        fields: model?.fields.map((field, index) => {
                          let filter = false
                          let uiFormField = null
                          ui.forms.forEach(form => {
                            form?.formFields?.forEach(formField => {
                              if (formField.name === field.name && field.type !== 'Json' && !field.name.endsWith('Id')) {
                                filter = true
                                uiFormField = formField
                                // model.fields[index] = {
                                //   ...model.fields[index],
                                //   filter: true
                                // }
                              }
                            });
                          });
                          return {
                            ...field,
                            uiFormField,
                            filter
                          }
                        }).filter((field) => {
                          switch (model?.name) {
                            case 'Product':
                              if (websiteData?.paymentMethod === 'crypto') {
                                if (field.name === 'stripeFee') {
                                  return false
                                }
                              }
                              break;
                            case 'Order':
                              if (websiteData?.paymentMethod === 'stripe') {
                                if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
                                  return false
                                }
                              } else if (websiteData?.paymentMethod === 'crypto') {
                                if (field?.name === 'stripeFee') {
                                  return false
                                }
                              }
                              break;
                            case 'Request':
                              if (websiteData?.paymentMethod === 'stripe') {
                                if (field?.name === 'transactionHash' || field?.name === 'walletAddress') {
                                  return false
                                }
                              } else if (websiteData?.paymentMethod === 'crypto') {
                                if (field?.name === 'stripeFee') {
                                  return false
                                }
                              }
                              break;
                              break;
                            default:
                              break;
                          }
                          return true;
                        })
                      }} />
                    )}
                  </Popover.Panel>
                </Transition>
              </Popover> */}
        {/* {model?.delete && (
                <div>
                  <ActionButtons.DeleteMany ids={selected} />
                </div>
              )} */}
      </div>
      <div className="flex flex-col">
        <div className="overflow-hidden" style={ui?.listStyle !== 'grid' ? {
          borderRadius: '10px',
          boxShadow: '0 0 25px rgb(0 0 0 / 10%)',
        } : {}}>
          {TableComponent && ui?.listStyle === 'grid' ? (
            <TableComponent
              onSelectHandler={onSelectHandler}
              getData={getData}
              pagesPath={pagesPath}
              ui={ui}
              connect={connect}
              actions={actions}
              onAction={onAction}
              parent={parent}
              data={data}
              initialFilter={initialFilter}
              model={model}
              fetchMore={fetchMore}
              loading={loading}
              pageCount={pageCount}
              sortByHandler={sortByHandler}
              filterHandler={filterHandler}
              inEdit={inEdit}
              ActionButtons={ActionButtons}
              selected={selected}
              isSelect={isSelect}
              lang={lang}
              fieldUpdate={fieldUpdate}
              hasFilters={hasFilters}
              setAllFilters={setAllFilters}
            />
          ) : (
            <div className="-my-2 overflow-auto sm:-mx-6 lg:-mx-8">
              <div className="py-2 align-middle inline-block min-w-full sm:px-6 lg:px-8">
                <div className="overflow-hidden relative rounded-t-lg">
                  {loading && <Spinner />}
                  <table
                    style={{ borderColor: 'transparent' }}
                    className="min-w-full divide-y divide-gray-50"
                    {...getTableProps()}
                  >
                    <thead>
                      {headerGroups.map((headerGroup: any, index: number) => (
                        <React.Fragment key={index}>
                          <tr {...headerGroup.getHeaderGroupProps()}>
                            {/* {isSelect && (
                                  <th scope="col" className={thClasses}>
                                    <Checkbox
                                      onChange={(e) => onSelectHandler(e.target.checked)}
                                      checked={data.length > 0 && selected.length === data.length}
                                      indeterminate={
                                        selected.length > 0 && selected.length !== data.length
                                      }
                                    />
                                  </th>
                                )} */}
                            <th scope="col" className={thClasses} colSpan={2}>
                              {/* {lang.actions} */}
                            </th>
                            {!ui?.hideConnect && fieldUpdate && parent && (
                              <th scope="col" className={thClasses}>
                                <button
                                  className={classNames(
                                    buttonClasses,
                                    'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'
                                  )}
                                  onClick={() => {
                                    if (hasFilters) {
                                      setAllFilters([]);
                                    } else {
                                      setAllFilters(initialFilter);
                                    }
                                  }}
                                >
                                  {hasFilters ? lang.viewAll : lang.viewRelated}
                                </button>
                              </th>
                            )}
                            {headerGroup.headers.map((column: any, index2: number) => {
                              return (
                                <th
                                  scope="col"
                                  className={thClasses}
                                  key={index2}
                                  {...column.getHeaderProps(column.getSortByToggleProps())}
                                >
                                  <div className="flex justify-center items-center">
                                    {column.render('Header')}
                                    <span>
                                      {column.isSorted ? (
                                        column.isSortedDesc ? (
                                          <ArrowNarrowDownIcon className="h-5 w-5" />
                                        ) : (
                                          <ArrowNarrowUpIcon className="h-5 w-5" />
                                        )
                                      ) : (
                                        ''
                                      )}
                                    </span>
                                    {!!filters.find((item) => item.id === column.id) ? (
                                      <SearchCircleIcon className="h-5 w-5 text-green-500" />
                                    ) : (
                                      ''
                                    )}
                                  </div>
                                </th>
                              );
                            })}
                          </tr>
                        </React.Fragment>
                      ))}
                    </thead>
                    <tbody
                      className="bg-white divide-y divide-gray-50"
                      {...getTableBodyProps()}
                    >
                      {page.map((row: any, index: number) => {
                        prepareRow(row);
                        return (
                          <tr
                            style={{ borderColor: 'transparent', cursor: 'pointer' }}
                            className="hover:bg-gray-50"
                            key={index}
                            {...row.getRowProps()}
                          >
                            {/* {isSelect && (
                                  <td className={tdClasses}>
                                    <Checkbox
                                      onChange={(e) =>
                                        onSelectHandler(
                                          e.target.checked,
                                          model && row.original[model.idField]
                                        )
                                      }
                                      checked={
                                        !!(model && selected.includes(row.original[model.idField]))
                                      }
                                    />
                                  </td>
                                )} */}
                            {!ui?.hideConnect && connect && (
                              <td colSpan={2} className={tdClasses.replace('px-4', '')}>
                                <button
                                  type="button"
                                  className={classNames(
                                    buttonClasses,
                                    'bg-transparent text-green-600 hover:bg-green-100 hover:bg-opacity-25'
                                  )}
                                  disabled={
                                    model &&
                                    connect[model.idField] === row.original[model.idField]
                                  }
                                  onClick={() =>
                                    onAction(
                                      'connect',
                                      data.find(
                                        (item) =>
                                          model &&
                                          item[model.idField] === row.original[model.idField]
                                      )
                                    )
                                  }
                                >
                                  {model &&
                                    connect[model.idField] === row.original[model.idField]
                                    ? lang.connected
                                    : lang.connect}
                                </button>
                              </td>
                            )}
                            {!connect && (
                              <td
                                className={tdClasses.replace('px-4', '')}
                                title={actions.update ? lang.editRow : lang.viewRow}
                                colSpan={actions.delete ? 1 : 2}
                              >
                                <ActionButtons.Update
                                  id={model ? row.original[model.idField] : 0}
                                />
                              </td>
                            )}
                            {actions.delete && !connect && (
                              <td className={tdClasses.replace('px-4', '')} title={lang.deleteRow} colSpan={1}>
                                <ActionButtons.Delete
                                  id={model ? row.original[model.idField] : 0}
                                />
                              </td>
                            )}
                            {!ui?.hideConnect && parent && model && fieldUpdate && (
                              <ListConnect
                                getData={getData}
                                parent={parent}
                                row={row}
                                model={model}
                              />
                            )}
                            {row.cells.map((cell: any, index2: number) => {
                              return (
                                <td
                                  style={{ maxWidth: '9rem' }}
                                  className={tdClasses}
                                  key={index2}
                                  {...cell.getCellProps()}

                                >
                                  {cell.render('Cell')}
                                </td>
                              );
                            })}
                          </tr>
                        );
                      })}
                      <tr>
                        <td className={tdClasses.replace('text-center', '')} colSpan={10000}>
                          {lang.showing} {page.length} {lang.of} ~
                          {controlledPageCount * pageSize} {lang.results}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
        <div
          className={classNames(
            'flex flex-wrap md:justify-between justify-center w-full',
            tdClasses
          )}
        >
          <nav
            className={classNames(
              "mb-2 inline-flex justify-center -space-x-px w-full md:w-auto",
              // 'w-full md:w-auto  mb-4 md:mb-0 inline-flex -space-x-px',
              dir === 'rtl' ? 'space-x-reverse' : ''
            )}
            aria-label="Pagination"
          >
            <button
              type="button"
              onClick={() => gotoPage(0)}
              disabled={!canPreviousPage}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                dir === 'rtl' ? 'rounded-r-md' : 'rounded-l-md'
              )}
            >
              <ChevronDoubleRightIcon
                className={classNames('h-4 w-4', dir === 'rtl' ? '' : 'transform rotate-180')}
              />
            </button>
            <button
              type="button"
              onClick={() => previousPage()}
              disabled={!canPreviousPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronRightIcon
                className={classNames('h-4 w-4', dir === 'rtl' ? '' : 'transform rotate-180')}
              />
            </button>
            {initPages(pageCount, pageIndex + 1, paginationOptions).map((item) => (
              <button
                type="button"
                className={classNames(
                  item === pageIndex + 1
                    ? 'bg-black text-white hover:bg-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                  'relative inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium'
                )}
                key={item}
                onClick={() => gotoPage(item - 1)}
              >
                {item}
              </button>
            ))}
            <button
              type="button"
              onClick={() => nextPage()}
              disabled={!canNextPage}
              className="relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              <ChevronLeftIcon
                className={classNames('h-4 w-4', dir === 'rtl' ? '' : 'transform rotate-180')}
              />
            </button>
            <button
              type="button"
              onClick={() => gotoPage(pageCount - 1)}
              disabled={!canNextPage}
              className={classNames(
                'relative inline-flex items-center px-2 py-2 border border-gray-300 bg-white text-sm font-medium text-gray-500 hover:bg-gray-50',
                dir === 'rtl' ? 'rounded-l-md' : 'rounded-r-md'
              )}
            >
              <ChevronDoubleLeftIcon
                className={classNames('h-4 w-4', dir === 'rtl' ? '' : 'transform rotate-180')}
              />
            </button>
          </nav>
          <div
            className={classNames(
              'inline-flex justify-center -space-x-px w-full md:w-auto',
              dir === 'rtl' ? 'space-x-reverse' : ''
            )}
          >
            {pageSizeOptions.map((item, index) => (
              <button
                type="button"
                key={index}
                className={classNames(
                  index === 0
                    ? dir === 'rtl'
                      ? 'rounded-r-md'
                      : 'rounded-l-md'
                    : index === pageSizeOptions.length - 1
                      ? dir === 'rtl'
                        ? 'rounded-l-md'
                        : 'rounded-r-md'
                      : '',
                  item === pageSize
                    ? 'bg-black text-white hover:bg-black'
                    : 'bg-white text-gray-700 hover:bg-gray-100',
                  'relative inline-flex items-center px-2 py-1 border border-gray-300  text-sm font-medium'
                )}
                onClick={() => setPageSize(item)}
              >
                {item}
              </button>
            ))}
          </div>
        </div>
      </div>

    </>
  );
};
