import express from 'express';
import { get, merge } from 'lodash';

import { getUsersBySessionToken } from '../db/users';

export const isOwner = async (req: express.Request, res: express.Response, next: express.NextFunction) => {
    try {
        const { id } = req.params;
        const currentUserId = get(req, 'identity._id') as string;

        if (!currentUserId) {
            return res.sendStatus(403);
        }

        if (currentUserId.toString() !== id) {
            return res.sendStatus(403);
        
        }


        next();
    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
    
    }

export const isAuthenticated = async (req: express.Request, res: express.Response ) => {
    try {
        const sessionToken = req.cookies['ANDRE-AUTH'];

        if (!sessionToken) {
            return res.sendStatus(403);
        }

        const existingUser = await getUsersBySessionToken(sessionToken);

        if (!existingUser) {
            return res.sendStatus(403);
        }

        merge(req, { identity: existingUser });

    } catch (error) {
        console.log(error);
        return res.sendStatus(400);
    }
};
