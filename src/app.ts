import express, { Request, Response } from 'express';
import cors from 'cors';
import { studentRoutes } from './app/modules/student/student.route';
const app = express();

//parsers
app.use(express.json());
app.use(cors());

// application-routes
app.use('/api/v1/students', studentRoutes)

app.get('/', (req: Request, res: Response) => {

  res.send('Server is running');
});

export default app;
