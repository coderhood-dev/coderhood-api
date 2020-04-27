export const checkAuth = (req: any, res: any, next: any) => {
  if (req.url.includes('/admin') || req.url.includes('favico')) {
    next();
  } else {
    res.status(403).send('Unauthorized!');
    return;
  }
};
