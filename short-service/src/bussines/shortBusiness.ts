import { AppDataSourceMongodb, AppDataSourceRedis } from './../repository/dataSource';
import { Business } from './business';
import { Request } from 'express';
import { RangeToken, SequenceTokenRepository, InstanceRangeTokenRepository } from '../repository/entities/tokenEntity';
import { InstanceEnv } from '../enviroment/instance';
import { ShortUrlEntity } from '../repository/entities/shortUrlEntity';
import { URL } from 'node:url';
import base62 = require('base62');

type NewShortUrl = {
    tokenSequence: number;
    tokenBase62: string;
    shortUrl: string;
    longUrl: string;
}

export class ShortBussines implements Business {

    getRootUrl(): string {
        return process.env.URL_ROOT ? process.env.URL_ROOT : 'http://127.0.0.1';
    }

    getNewUrlShort(): NewShortUrl {
        const tokenSequence = InstanceEnv.getIntance().token.nextToken();
        const tokenBase62 = base62.encode(tokenSequence);

        const url: URL = new URL(tokenBase62, this.getRootUrl());
        const newShortUrl: NewShortUrl = { tokenSequence, tokenBase62, shortUrl: url.href, longUrl: '' };
        return newShortUrl;
    }

    async saveShortUrl(longUrl: string, urlShort: NewShortUrl) {
        const urlShortEntity: ShortUrlEntity = new ShortUrlEntity();
        urlShortEntity.sequence = urlShort.tokenSequence;
        urlShortEntity.longUrl = longUrl
        urlShortEntity.shortUrl = urlShort.shortUrl;
        await urlShortEntity.save();
    }

    async get(request: Request): Promise<string> {
        var token: string = request.params.url;

        const cacheLongUrl: string | null = await AppDataSourceRedis.get(token);
        if (cacheLongUrl) {
            return cacheLongUrl;
        } else {
            const shortUrlEntity: ShortUrlEntity | null = await ShortUrlEntity.findOneBy({ token });
            if (shortUrlEntity) {
                AppDataSourceRedis.set(shortUrlEntity.token, shortUrlEntity.longUrl);
                return shortUrlEntity.longUrl;
            } else {
                return this.getRootUrl();
            }
        }
    };

    async saveInCache(url: NewShortUrl): Promise<void> {
        AppDataSourceRedis.set(url.tokenBase62, url.longUrl);
    }

    async post(request: Request): Promise<string> {
        var longUrl: string = request.body.url;
        const newShortUrl: NewShortUrl = this.getNewUrlShort();
        newShortUrl.longUrl = longUrl;
        await this.saveShortUrl(longUrl, newShortUrl);
        await this.saveInCache(newShortUrl);

        return newShortUrl.shortUrl;
    };
}