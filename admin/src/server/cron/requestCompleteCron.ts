import cronjob from 'node-cron';

import prisma from '../context/prisma';

const requestCompleteCron = async ({ res }) => {
  const requests = await prisma.request.findMany({
    where: {
      requestStatus: {
        equals: 'active'
      }
    }
  })
  const completedRequests: any[] = []
  requests.forEach((request) => {
    if (request?.requestStatus === 'active' && request?.expiredAt) {
      const expiredAt = new Date(request?.expiredAt).getTime()
      const now = new Date().getTime()
      // console.log(expiredAt, now, request?.expiredAt, new Date(), request.id)
      if (expiredAt < now) {
        completedRequests.push(request)
      }
    }
  })
  if (completedRequests?.length > 0) {
    const updateRequests = await prisma.request.updateMany({
      where: {
        id: {
          in: completedRequests.map((request) => request.id)
        }
      },
      data: {
        requestStatus: 'completed'
      }
    })
    // console.log(updateRequests, 'requests updated')
  }
  res?.status(200).end('requestCompleteCron');

}


// const scheduledJobFunction = cronjob.schedule("0 */30 * * * *", requestCompleteCron);


export default requestCompleteCron;