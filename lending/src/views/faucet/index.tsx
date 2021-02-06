import React, { useCallback } from 'react';
import { Card } from 'antd';
import { useConnection } from 'common/src/contexts/connection';
import { useWallet } from 'common/src/contexts/wallet';
import { LAMPORTS_PER_SOL } from '@solana/web3.js';
import { notify } from 'common/src/utils/notifications';
import { ConnectButton } from './../../components/ConnectButton';
import { LABELS } from '../../constants';

export const FaucetView = () => {
  const connection = useConnection();
  const { wallet } = useWallet();

  const airdrop = useCallback(() => {
    connection.requestAirdrop(wallet.publicKey, 2 * LAMPORTS_PER_SOL).then(() => {
      notify({
        message: LABELS.ACCOUNT_FUNDED,
        type: 'success',
      });
    });
  }, [wallet, connection]);

  const bodyStyle: React.CSSProperties = {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  };

  return (
    <div className='flexColumn' style={{ flex: 1 }}>
      <Card title={'Faucet'} bodyStyle={bodyStyle} style={{ flex: 1 }}>
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-around',
            alignItems: 'center',
          }}
        >
          <div className='deposit-input-title' style={{ margin: 10 }}>
            {LABELS.FAUCET_INFO}
          </div>
          <ConnectButton type='primary' onClick={airdrop}>
            {LABELS.GIVE_SOL}
          </ConnectButton>
        </div>
      </Card>
    </div>
  );
};
