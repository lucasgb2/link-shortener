import { RangeToken, SequenceTokenRepository } from './../../repository/entities/tokenEntity';
import { Component } from "./component";


export class TokenComponent implements Component {

    private rangeToken: RangeToken = { beginToken: 0, endToken: 0 };
    private lastToken: number = 0;

    private async generateToken(): Promise<RangeToken> {
        let inc = process.env.INCREMENT_RANGE_TOKEN ? process.env.INCREMENT_RANGE_TOKEN : 1000;
        let beginToken: number = 0;
        let endToken: number = 0;

        var sequence: SequenceTokenRepository | null = await SequenceTokenRepository.findOneBy({ id: 1 });

        if (sequence) {
            beginToken = sequence.lastToken + 1;
            sequence.lastToken = sequence.lastToken + (inc as number);
        } else {
            beginToken = 1;
            sequence = new SequenceTokenRepository();
            sequence.lastToken = (inc as number);
        }
        await sequence.save();

        endToken = sequence.lastToken;
        const range: RangeToken = { beginToken, endToken };

        return range;
    }

    public async newRangeToken(): Promise<void> {
        this.rangeToken = await this.generateToken();
        this.lastToken = this.rangeToken.beginToken;
    }

    public async initialize(): Promise<void> {
        await this.newRangeToken();
    }

    public nextToken(): number {
        if (this.lastToken == this.rangeToken.endToken) {
            this.newRangeToken();
        } else {
            this.lastToken++;
        }
        return this.lastToken;
    }

}