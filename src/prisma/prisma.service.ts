import { Injectable } from '@nestjs/common';
import { PrismaClient } from 'prisma/prisma-client';

@Injectable()
export class PrismaService extends PrismaClient {}
