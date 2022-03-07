import { json } from 'body-parser';
import * as express from 'express';
import { NextFunction, Response } from 'express';
import {
  error,
  middleware as openapiMiddleware,
} from 'express-openapi-validator';
import { join } from 'path';
import { env } from 'process';

/* Overrides Router class to catch async errors. */
require('express-async-errors');

import { recipesRouter } from './recipes/recipes-router';

function main() {
  const app = express();
  const port = env.PORT ?? 3000;

  app.use(json());

  app.use(recipesRouter);

  app.use((err: unknown, req: unknown, res: Response, next: NextFunction) => {
    console.error(err);
    res.status(500).send({
      type: 'https://whiskmate.io/problems/unknown-error',
      title: 'Unknown Error',
    });
  });

  app.listen(port, () => {
    console.log(`Listenining at http://localhost:${port}`);
  });
}

main();
