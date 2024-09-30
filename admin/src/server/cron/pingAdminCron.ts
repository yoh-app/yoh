import cronjob from 'node-cron';

const pingAdminCron = ({ res }) => {
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/User/Website/Website`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Page`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/PageGroup`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/ProductCollection`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Analytics`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Order`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Request`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Product`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Link`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Document`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Picture`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Audio`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Video`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Customer`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/NftOverview`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/Onboard`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Organization/Organization/DesignPage`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/Website`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/User`).catch((err) => console.log(err))
  fetch(`${process.env.PROTOCOL}://${process.env.NODE_ENV === 'production' ? 'dashboard' : 'www'}.${process.env.NEXT_PUBLIC_COOKIE_DOMAIN}/admin/notifications`).catch((err) => console.log(err))
  res?.status(200).end('pingAdminCron');

}

// const scheduledJobFunction = cronjob.schedule("*/50 * * * * *", pingAdminCron);


export default pingAdminCron;