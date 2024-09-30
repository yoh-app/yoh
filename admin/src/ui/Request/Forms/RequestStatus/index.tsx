import { useUpdateOneRequestMutation } from 'generated';
import { useTheme } from '@mui/material/styles';
import { Button, TextField } from '@mui/material';
import { Check, Close } from '@mui/icons-material';
import Label from 'components/ui/label';
import { useState } from 'react';
import Spinner from 'admin/components/Spinner';
import { useTranslation } from 'next-i18next';
const RequestStatus = ({ action, register, errors, handleSubmit, setValue, getValues, watch, data }) => {
  const { t } = useTranslation('admin');
  const [updateRequest] = useUpdateOneRequestMutation();
  const theme = useTheme();
  const [loading, setLoading] = useState(false);
  const getBeginDuration = (request) => {
    const paidDate = new Date(request.paidAt);
    let begin = '';
    if (request.paidAt && paidDate) {
      begin = `${paidDate.getFullYear()}/${
        paidDate.getMonth() + 1
      }/${paidDate.getDate()} ${paidDate.getHours()}:${paidDate.getMinutes()}:${paidDate.getSeconds()}`;
    }
    return begin;
  };
  const getEndDuration = (request) => {
    let paidDate = new Date(request.paidAt);
    let end = '';
    if (request.paidAt && paidDate) {
      let endDate = new Date(paidDate.getTime() + request.days * 24 * 60 * 60 * 1000);
      end = `${endDate.getFullYear()}/${
        endDate.getMonth() + 1
      }/${endDate.getDate()} ${endDate.getHours()}:${endDate.getMinutes()}:${endDate.getSeconds()}`;
    }
    return end;
  };
  return (
    <div>
      {loading && <Spinner />}
      <div className="p-2">
        <Label>{t('request.status')}</Label>
        <TextField
          size="small"
          fullWidth
          disabled
          value={t(`request.requestStatus.${data?.requestStatus}`)}
        ></TextField>
      </div>
      {data?.requestStatus === 'pending' ? (
        <div className="p-2">
          <Label>{t('request.action')}</Label>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            style={{ borderColor: theme.palette.grey[700] }}
            startIcon={<Check />}
            onClick={async () => {
              setLoading(true);
              await updateRequest({
                variables: {
                  where: {
                    id: data.id,
                  },
                  data: {
                    requestStatus: { set: 'processing' },
                    // requestAccept: { set: 'accept' },
                    // paid: { set: true },
                  },
                },
              });
              setLoading(false);
            }}
          >
            {t('request.accept')}
          </Button>
          <Button
            type="button"
            variant="outlined"
            color="inherit"
            style={{ borderColor: theme.palette.grey[700], marginLeft: '1rem' }}
            startIcon={<Close />}
            onClick={async () => {
              setLoading(true);
              await updateRequest({
                variables: {
                  where: {
                    id: data.id,
                  },
                  data: {
                    requestStatus: { set: 'rejected' },
                    // requestAccept: { set: 'reject' },
                    // paid: { set: false },
                  },
                },
              });
              setLoading(false);
            }}
          >
            {t('request.reject')}
          </Button>
        </div>
      ) : (
        []
      )}
      {data?.requestStatus === 'active' || data?.requestStatus === 'completed' ? (
        <div className="p-2 flex">
          <div className="flex-grow mr-2">
            <Label> {t('request.from')}</Label>
            <TextField size="small" fullWidth disabled value={getBeginDuration(data)}></TextField>
          </div>
          <div className="flex-grow ml-2">
            <Label> {t('request.to')}</Label>
            <TextField size="small" fullWidth disabled value={getEndDuration(data)}></TextField>
          </div>
        </div>
      ) : (
        []
      )}
    </div>
  );
};

export default {
  custom: true,
  hideOn: null,
  disableOn: null,
  component: RequestStatus,
  intl: {
    titleId: '_Admin.Website._PageGroup.Request._Page.Request._Form.RequestStatus._Title',
    title: 'RequestStatus',
    descriptionId: '_Admin.Website._PageGroup.Request._Page.Request._Form.RequestStatus._Description',
    description: 'RequestStatus Description',
  },
  order: 1,
};
