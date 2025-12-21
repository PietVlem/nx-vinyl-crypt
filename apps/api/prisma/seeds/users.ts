import type { PrismaClient } from '@prisma/client';

export const deleteUsers = (prismaClient: PrismaClient) =>
    prismaClient.user.deleteMany();

export const createMainUser = async (prismaClient: PrismaClient) =>  
    prismaClient.user.create({
        data: {
            name: 'Pieter Vleminckx',
            email: 'pieter.vleminckx@gmail.com',
            auth0Id: 'google-oauth2|101765367411091974753',
        }
    })