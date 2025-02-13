import { Connection, PublicKey } from '@solana/web3.js';
import { ProgramAccount } from '../tools/sdk/runtime';
import { MaxVoterWeightRecord } from './accounts';
import { GovernanceAddinAccountParser } from './serialisation';

export async function getMaxVoterWeightRecord(
  connection: Connection,
  maxVoterWeightRecordPk: PublicKey,
) {
  return getGovernanceAddinAccount(
    connection,
    maxVoterWeightRecordPk,
    MaxVoterWeightRecord,
  );
}

export async function getGovernanceAddinAccount<TAccount>(
  connection: Connection,
  accountPk: PublicKey,
  accountClass: new (args: any) => TAccount,
) {
  const accountInfo = await connection.getAccountInfo(accountPk);

  if (!accountInfo) {
    throw new Error(
      `Account ${accountPk} of type ${accountClass.name} not found`,
    );
  }

  return GovernanceAddinAccountParser(accountClass as any)(
    accountPk,
    accountInfo,
  ) as ProgramAccount<TAccount>;
}
