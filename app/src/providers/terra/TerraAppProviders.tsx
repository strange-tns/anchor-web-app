import { UIElementProps } from '@libs/ui';
import { RouterWalletStatusRecheck } from '@libs/use-router-wallet-status-recheck';
import {
  NetworkInfo,
  ReadonlyWalletSession,
  WalletControllerChainOptions,
  WalletProvider,
} from '@terra-money/wallet-provider';
import { useReadonlyWalletDialog } from 'components/dialogs/useReadonlyWalletDialog';
import { AppProviders } from 'configurations/app';
import { TerraAccountProvider } from './TerraAccountProvider';
import { TerraTokenBalancesProvider } from './TerraTokenBalancesProvider';
import React, { useCallback } from 'react';

export function TerraAppProviders({
  children,
  walletConnectChainIds,
  defaultNetwork,
}: UIElementProps & WalletControllerChainOptions) {
  const [openReadonlyWalletSelector, readonlyWalletSelectorElement] =
    useReadonlyWalletDialog();

  const createReadonlyWalletSession = useCallback(
    (networks: NetworkInfo[]): Promise<ReadonlyWalletSession | null> => {
      return openReadonlyWalletSelector({
        networks,
      });
    },
    [openReadonlyWalletSelector],
  );

  return (
    <WalletProvider
      defaultNetwork={defaultNetwork}
      walletConnectChainIds={walletConnectChainIds}
      connectorOpts={{ bridge: 'https://walletconnect.terra.dev/' }}
      createReadonlyWalletSession={createReadonlyWalletSession}
    >
      <TerraAccountProvider>
        <AppProviders dialogs={readonlyWalletSelectorElement}>
          <TerraTokenBalancesProvider>
            <RouterWalletStatusRecheck />
            {children}
          </TerraTokenBalancesProvider>
        </AppProviders>
      </TerraAccountProvider>
    </WalletProvider>
  );
}
