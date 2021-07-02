import { Request, Response } from "express";
import * as jwt from 'jsonwebtoken'
import { apiConfig } from "./api-config";

export const handleAuthorization = (req:Request, res:Response, next:any) => {
    const token = extractToken(req)
    if(!token){
        res.setHeader('WWW-Authenticate', 'Bearer token_type="JWT"')
        res.status(410).json({message:'Você precisa se autenticar'})
    }else{
        jwt.verify(token, apiConfig.secret, (error,decoded) => {
            if(decoded){
                next()
            }else{
                res.status(403).json({message:'Não autorizado'})
            }
        })
    }
}

function extractToken(req:Request){
    let token: string | undefined
    if(req.headers && req.headers.authorization){
        //Authorization: Bearer ZZZ.ZZZ.ZZZ
        const parts: string[] = req.headers.authorization.split(' ')
        if(parts.length === 2 && parts[0] === 'Bearer'){
            token = parts[1]
        }
    }
    return token
}