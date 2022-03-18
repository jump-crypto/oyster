import { PublicKey, TransactionInstruction } from '@solana/web3.js';
import { GOVERNANCE_SCHEMA } from './serialisation';
import { serialize } from 'borsh';
import { SetGovernanceDelegateArgs } from './instructions';
import { getTokenOwnerRecordAddress, GOVERNANCE_PROGRAM_SEED } from './accounts';
import { TOKEN_PROGRAM_ID } from '../tools/sdk/splToken';

export const withSetGovernanceDelegate = async (
    instructions: TransactionInstruction[],
    programId: PublicKey,
    governanceAuthority: PublicKey,
    realm: PublicKey,
    governingTokenMint: PublicKey,
    governingTokenOwner: PublicKey,
    newGovernanceDelegate: PublicKey | null,
) => {
    const args = new SetGovernanceDelegateArgs({ newGovernanceDelegate });
    const data = Buffer.from(serialize(GOVERNANCE_SCHEMA, args));

    const voteRecordAddress = await getTokenOwnerRecordAddress(
        programId,
        realm,
        governingTokenMint,
        governingTokenOwner,
    );

    const keys = [
        {
            pubkey: governanceAuthority,
            isWritable: false,
            isSigner: true,
        },
        {
            pubkey: voteRecordAddress,
            isWritable: true,
            isSigner: false,

        },
    ];

    instructions.push(
        new TransactionInstruction({
            keys,
            programId,
            data,
        }),
    );
};