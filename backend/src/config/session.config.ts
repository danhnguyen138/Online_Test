import FileStoreFactory from 'session-file-store';
import session from 'express-session';
import { dirname } from 'path';

const FileStore: FileStoreFactory.FileStore = FileStoreFactory(session);

const sessionConfig: any = {
  store: new FileStore({
    path: `${dirname(__dirname)}/data/sessions`
  }),
  secret: 'OnlineTest123',
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: false,
    httpOnly: true,
    maxAge: 3600000 * 24 * 1
  },
  name: 'serverSessionID'
};

export default sessionConfig;
