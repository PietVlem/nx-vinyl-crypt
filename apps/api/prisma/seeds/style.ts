import type { PrismaClient } from '@prisma/client';
import styles from '../data/styles.json';

export const deleteStyles = (prismaClient: PrismaClient) => 
    prismaClient.style.deleteMany()

export const createStyles = async (prismaClient: PrismaClient) => {
    for (const style of styles) {
        await prismaClient.style.create({
            data: { name: style },
        });
    };
}
