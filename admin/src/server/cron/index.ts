import pingAdminCron from './pingAdminCron';
import orderCron from './orderCron';
import requestPaidCron from './requestPaidCron';
import requestCompleteCron from './requestCompleteCron';
import productAddressCron from './productAddressCron';
import cronjob from 'node-cron';

const registerCron = () => {
  if (process.env.NODE_ENV === 'production') {
    pingAdminCron({ res: null })
  } else {
    cronjob.schedule("*/50 * * * * *", () => orderCron({ res: null }));
    cronjob.schedule("*/53 * * * * *", () => requestPaidCron({ res: null }));
    cronjob.schedule("*/34 * * * * *", () => requestCompleteCron({ res: null }));
    cronjob.schedule("*/45 * * * * *", () => productAddressCron({ res: null }));
  }
}

export default registerCron;