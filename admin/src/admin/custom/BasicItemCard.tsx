// material
import { experimentalStyled as styled } from '@mui/material/styles';
import { Box, Link, Button, Card, Grid, Avatar, Typography, CardContent, CardActions, CardMedia } from '@mui/material';
// routes
// utils
// @types
// import { Post } from '../../@types/blog';
import { useEnterAdminMutation } from 'generated';
import { ListConnect } from '../PrismaTable/Table/ListConnect';
import { useRouter } from 'next/router';
// ----------------------------------------------------------------------

const CardBgStyle = styled('div')<{ ownerState: { src?: string } }>(({ theme, ownerState }) => ({
  position: 'absolute',
  top: 0,
  right: 0,
  bottom: 0,
  left: 0,
  backgroundImage: `url(${ownerState.src})`,
  backgroundSize: 'cover',
  backgroundPosition: 'center',
  backgroundRepeat: 'no-repeat',
}));

const CardMediaStyle = styled('div')(({ theme }) => ({
  position: 'relative',
  paddingTop: 'calc(100% * 3 / 4)',
}));

const TitleStyle = styled(Link)(({ theme }) => ({
  height: 44,
  overflow: 'hidden',
  WebkitLineClamp: 2,
  display: '-webkit-box',
  WebkitBoxOrient: 'vertical',
  textDecoration: 'none',
  '&:hover': {
    textDecoration: 'underline',
  },
}));

const AvatarStyle = styled(Avatar)(({ theme }) => ({
  zIndex: 9,
  width: 32,
  height: 32,
  position: 'absolute',
  left: theme.spacing(3),
  bottom: theme.spacing(-2),
}));

const InfoStyle = styled('div')(({ theme }) => ({
  display: 'flex',
  flexWrap: 'wrap',
  justifyContent: 'flex-end',
  marginTop: theme.spacing(3),
  color: theme.palette.text.disabled,
}));

const CoverImgStyle = styled('img')(({ theme }) => ({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
}));

// ----------------------------------------------------------------------

type BasicItemCardProps = {
  item: any;
  // index: number;
};

export default function BasicItemCard({
  item,
  model,
  ui,
  parent,
  actions,
  connect,
  getData,
  onAction,
  pagesPath,
  data,
  isSelect,
  selected,
  fieldUpdate,
  ActionButtons,
  onSelectHandler,
}: BasicItemCardProps) {
  const { imageObj, title, name } = item;
  const router = useRouter();
  const [enterAdmin] = useEnterAdminMutation();
  const controls = [];
  if (connect) {
    controls.push({
      text: 'Connect',
      disabled: model && connect[model.idField] === item[model.idField],
      onClick: () => {
        onAction(
          'connect',
          data.find((record) => model && record[model.idField] === item[model.idField])
        );
      },
    });
  }

  const enterAdminAction = async () => {
    if (ui?.admin) {
      const { data } = await enterAdmin({
        variables: {
          admin: model.id,
          id: item[model.idField],
        },
      });
      if (data?.enterAdmin?.token) {
        localStorage.setItem('accessToken', data?.enterAdmin?.token);
        window.location.assign(`/${router.locale}/admin`);
      }
    } else if (model.name === 'Staff') {
      const { data } = await enterAdmin({
        variables: {
          admin: 'Organization',
          id: item.organization.id,
        },
      });
      if (data?.enterAdmin?.token) {
        localStorage.setItem('accessToken', data?.enterAdmin?.token);
        window.location.assign(`/${router.locale}/admin`);
      }
    }
  }

  return (
    <Grid item xs={6} sm={4} md={3}>
      <Card sx={{ position: 'relative' }}>
        {/* <CardBgStyle
          ownerState={{ src: imageObj?.url ? imageObj.url : '/images/placeholder.svg' }}
        ></CardBgStyle> */}
        <CardMedia
          sx={{
            objectFit: 'cover',
            height: '200px',
            // width: '200px'
          }}
          component="img"
          image={imageObj?.url ? imageObj.url : '/images/placeholder.svg'}
        />
        <CardContent
          sx={{
            // mt: 20,
            position: 'relative',
            backgroundColor: 'rgba(255, 255, 255, 0.87)',
          }}
          style={{
            padding: '8px 12px',
          }}
        >
          <TitleStyle
            sx={{
              color: 'inherit',
              typography: 'subtitle2',
              fontSize: '18px',
              height: 'unset',
              mb: 1.5,
            }}
          >
            {model?.name === 'Staff' ? item?.organization?.name : title ?? name ?? null}
          </TitleStyle>


        </CardContent>
        <CardActions>
          <div className="flex">
            {(ui.admin || model.name === 'Staff') ? (<>
              <Button
                onClick={enterAdminAction}
                size="Small"
                appearance="ghost"
                status="Success"
              >
                Enter
              </Button>
              {/* {actions.delete && !connect && (
                <ActionButtons.Delete id={item[model.idField]} />
              )} */}
            </>

            ) : (
              <>
                {!connect && item[model.idField] && (
                  <ActionButtons.Update id={item[model.idField]} />
                )}
                {!parent && actions.delete && !connect && item[model.idField] && (
                  <ActionButtons.Delete id={item[model.idField]} />
                )}
                {!ui?.hideConnect && parent && model && fieldUpdate && (
                  <ListConnect
                    parent={parent}
                    row={{ original: item }}
                    model={model}
                    getData={getData}
                  />
                )}

                <InfoStyle>
                  {controls.map((info, index) => {
                    if (info.disabled) {
                      return null;
                    } else {
                      return (
                        <Box
                          onClick={info.onClick}
                          key={index}
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            ml: index === 0 ? 0 : 1.5,
                          }}
                        >
                          <Box sx={{ width: 16, height: 16, mr: 0.5 }} />
                          <Typography variant="caption">
                            {info.text}
                            {/* {fShortenNumber(info.number)} */}
                          </Typography>
                        </Box>
                      );
                    }
                  })}
                </InfoStyle>
              </>
            )}
          </div>
        </CardActions>
      </Card>
    </Grid>
  );
}
