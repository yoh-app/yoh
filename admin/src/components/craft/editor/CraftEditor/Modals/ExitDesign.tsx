import React, { useContext, useEffect } from 'react';
import { useEditor } from '@craftjs/core';
import Box from '@mui/material/Box';
import Iconify from 'components/Iconify';
import { useTranslation } from 'next-i18next';
import { useRouter } from 'next/router';
import { CraftContext } from '../../CraftContext';

const ExitDesign = ({ onClose, onSave }) => {
  const { t } = useTranslation('design');
  const router = useRouter()
  const { nextPage, setLoading, loading, view } = useContext(CraftContext);
  const { enabled, query, canUndo, canRedo } = useEditor((state, query) => ({
    enabled: state.options.enabled,
    canUndo: query.history.canUndo(),
    canRedo: query.history.canRedo(),
  }))

  const goToPage = () => {
    // if (nextPage.includes('DesignPage')) {
    // console.log(router)
    if (nextPage.includes('https://')) {
      window.location.assign(nextPage)
    } else {
      window.location.assign(`/${router?.locale}${nextPage}`)
    }
    // } else {
    //   router.push(nextPage)
    // }
  }

  // useEffect(() => {
  //   if (enabled && !canUndo && !canRedo && view === 'exit_design') {
  //     window.location.assign(`/${router?.locale}${nextPage}`)
  //   }
  // }, [enabled, canUndo, canRedo, view])

  return (
    <div className="flex" style={{ justifyContent: 'space-evenly' }}>
      {/* <Box>
        <Box
          sx={{
            padding: '10px',
            borderRadius: '12px',
          }}
        >
          <Iconify icon={'bx:home-alt'} width={20} height={20} />
        </Box>
      </Box> */}
      <Box sx={{ alignSelf: 'center', maxWidth: '300px' }}>
        {t('WebsiteAdmin.Design.message.exitDesign')}
      </Box>
      <Box
        sx={{
          width: '40px',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          // borderLeft: '1px solid rgba(145, 158, 171, 0.24)',
        }}
      >

        <Box
          sx={{
            width: '80px',
            // color: '#6851FF',
            // borderTop: '1px solid rgba(145, 158, 171, 0.24)',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '10px'
          }}
          onClick={async () => {
            if (enabled && (canRedo || canUndo)) {
              setLoading(true)
              const updateString = query.serialize();
              const updateJson = JSON.parse(updateString);
              await onSave(updateString);
              setLoading(false)
            }
            goToPage()
          }}
        >
          {t('WebsiteAdmin.Design.message.exitDesign.yes')}
        </Box>
        <Box
          sx={{
            width: '80px',
            flexGrow: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            cursor: 'pointer',
            padding: '10px'
          }}
          onClick={goToPage}
        >
          {t('WebsiteAdmin.Design.message.exitDesign.no')}
        </Box>
      </Box>
    </div>
  );
};
export default ExitDesign