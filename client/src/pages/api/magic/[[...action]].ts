import confirm from '@server/magic/api/confirm';
import login from '@server/magic/api/login';
import verify from '@server/magic/api/verify';
import logout from '@server/magic/api/logout';
import complete from '@server/magic/api/complete';
import refresh from '@server/magic/api/refresh';
import watch from '@server/magic/api/watch';

export default async function magicRoutes(req, res) {
  const { action } = req.query;
  if (req.method === 'GET') {
    switch (action[0]) {
      case 'confirm':
        return confirm(req, res);

      default:
    }
  } else if (req.method === 'POST') {
    switch (action[0]) {
      case 'login':
        return login(req, res);
      case 'verify':
        return verify(req, res);
      case 'complete':
        return complete(req, res);
      case 'refresh':
        return refresh(req, res);
      case 'logout':
        return logout(req, res);
      case 'watch':
        return watch(req, res);
      default:
    }
  }
  return res.status(400).end(`Error: HTTP ${req.method} is not supported for ${req.url}`);
}
