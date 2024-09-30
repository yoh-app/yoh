import { useContext } from 'react';
import { orderBy } from 'lodash';
import { Icon } from '@iconify/react';
import plusFill from '@iconify/icons-eva/plus-fill';
// import { Link as RouterLink } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import InfiniteScroll from 'react-infinite-scroll-component';
import { useEffect, useCallback, useState } from 'react';
// material
import { Box, Grid, Button, Skeleton, Container, Typography } from '@mui/material';
// redux
import { getPostsInitial, getMorePosts } from '../redux/slices/blog';
// @types
import { Post, BlogState } from '../@types/blog';
// routes
import { PATH_DASHBOARD } from '../routes/paths';
// components
import HeaderDashboard from '../components/HeaderDashboard';
// import { BlogPostCard, BlogPostsSort, BlogPostsSearch } from '../components/blog';
import BasicItemCard from './BasicItemCard';
// ----------------------------------------------------------------------
import { TableContext } from '../PrismaTable/Context';
import Spinner from '../components/Spinner';
import { useTranslation } from 'next-i18next'
import Divider from '@mui/material/Divider';
import Chip from '@mui/material/Chip';

const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest' },
  { value: 'popular', label: 'Popular' },
  { value: 'oldest', label: 'Oldest' },
];

// ----------------------------------------------------------------------

const SkeletonLoad = (
  <Box sx={{ mt: 2 }}>
    <Grid container spacing={3}>
      {[...Array(4)].map((item, index) => (
        <Grid item xs={12} md={3} key={index}>
          <Skeleton variant="rectangular" width="100%" sx={{ height: 200, borderRadius: 2 }} />
          <Box sx={{ display: 'flex', mt: 1.5 }}>
            <Skeleton variant="circular" sx={{ width: 40, height: 40 }} />
            <Skeleton variant="text" sx={{ mx: 1, flexGrow: 1 }} />
          </Box>
        </Grid>
      ))}
    </Grid>
  </Box>
);

export default function BasicGrid({
  onSelectHandler,
  fieldUpdate,
  initialFilter,
  model,
  data,
  fetchMore,
  loading,
  pageCount,
  sortByHandler,
  filterHandler,
  onAction,
  inEdit,
  connect,
  parent,
  ActionButtons,
  pagesPath,
  actions,
  ui,
  selected,
  isSelect,
  hasFilters,
  setAllFilters,
  lang,
  getData,
}) {
  const { t } = useTranslation('admin')
  if (loading) {
    return <Spinner />;
  }
  return (
    <div style={{ padding: 20 }}>
      {fieldUpdate && parent && (
        <div className="mb-5">
          <button
            className={'bg-transparent text-blue-600 hover:bg-blue-100 hover:bg-opacity-25'}
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
        </div>
      )}
      {/* <Typography variant="body1">
        {t('added')}
      </Typography> */}
      <Grid container spacing={3}>
        {data
          .filter(
            (filterItem) =>
              !!parent?.value?.[parent.field]?.find(
                (r: any) => r[model.idField] === filterItem[model.idField]
              )
          )
          .map((item, index) => (
            <BasicItemCard
              onSelectHandler={onSelectHandler}
              getData={getData}
              fieldUpdate={fieldUpdate}
              data={data}
              pagesPath={pagesPath}
              onAction={onAction}
              connect={connect}
              actions={actions}
              parent={parent}
              ui={ui}
              model={model}
              selected={selected}
              isSelect={isSelect}
              key={item.id}
              item={item}
              index={index}
              ActionButtons={ActionButtons}
            />
          ))}
      </Grid>
      {!ui?.hideConnect && <>
        {parent && <Divider style={{ marginTop: '30px' }}><Chip label={t('addRemoveItems')} /></Divider>}
        {/* <Typography variant="body1">
          {t('notAdded')}
        </Typography> */}

        <Grid style={{ marginTop: '10px' }} container spacing={3}>
          {data
            .filter(
              (filterItem) =>
                !parent?.value?.[parent.field]?.find(
                  (r: any) => r[model.idField] === filterItem[model.idField]
                )
            )
            .map((item, index) => (
              <BasicItemCard
                onSelectHandler={onSelectHandler}
                getData={getData}
                fieldUpdate={fieldUpdate}
                data={data}
                pagesPath={pagesPath}
                onAction={onAction}
                connect={connect}
                actions={actions}
                parent={parent}
                ui={ui}
                model={model}
                selected={selected}
                isSelect={isSelect}
                key={item.id}
                item={item}
                index={index}
                ActionButtons={ActionButtons}
              />
            ))}
        </Grid>
      </>}
    </div>
    // <Container>
    //   <HeaderDashboard
    //     heading={model.name}
    //     links={[{ name: 'Dashboard', href: PATH_DASHBOARD.root }, { name: model.name }]}
    //     action={
    //       <Button variant="contained" startIcon={<Icon icon={plusFill} />} onClick={onAction('create')}>
    //         New
    //       </Button>
    //     }
    //   />

    //   <InfiniteScroll
    //     next={onScroll}
    //     hasMore={hasMore}
    //     loader={SkeletonLoad}
    //     dataLength={data.length}
    //     style={{ overflow: 'inherit' }}
    //   >
    //     <Grid container spacing={3}>
    //       {data.map((item, index) => (
    //         <BasicItemCard
    //           data={data}
    //           pagesPath={pagesPath}
    //           onAction={onAction}
    //           connect={connect}
    //           actions={actions}
    //           parent={parent}
    //           ui={ui}
    //           model={model}
    //           selected={selected}
    //           isSelect={isSelect}
    //           key={item.id}
    //           item={item}
    //           index={index}
    //         />
    //       ))}
    //     </Grid>
    //   </InfiniteScroll>
    // </Container>
  );
}
