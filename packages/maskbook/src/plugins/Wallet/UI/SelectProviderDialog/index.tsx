import { useCallback } from 'react'
import {
    Box,
    makeStyles,
    Theme,
    DialogContent,
    ImageList,
    ImageListItem,
    List,
    ListItem,
    Typography,
    Link,
    DialogActions,
} from '@material-ui/core'
import { SuccessIcon } from '@dimensiondev/icons'
import { isEnvironment, Environment } from '@dimensiondev/holoflows-kit'
import { useHistory } from 'react-router-dom'
import classnames from 'classnames'
import { Flags, useI18N, useRemoteControlledDialog, unreachable, useValueRef } from '../../../../utils'
import { useStylesExtends } from '../../../../components/custom-ui-helper'
import { Provider } from '../Provider'
import { MetaMaskIcon } from '../../../../resources/MetaMaskIcon'
import { MaskbookIcon } from '../../../../resources/MaskbookIcon'
import { WalletConnectIcon } from '../../../../resources/WalletConnectIcon'
import Services from '../../../../extension/service'
import { WalletMessages } from '../../messages'
import { DashboardRoute } from '../../../../extension/options-page/Route'
import { ProviderType, NetworkType } from '../../../../web3/types'
import { InjectedDialog } from '../../../../components/shared/InjectedDialog'
import { NetworkIcon } from '../../../../components/shared/NetworkIcon'
import {
    currentMaskbookChainIdSettings,
    currentSelectedWalletNetworkSettings,
    currentSelectedWalletProviderSettings,
} from '../../settings'
import { useWallets } from '../../hooks/useWallet'
import { resolveNetworkChainId } from '../../../../web3/pipes'
import CHAINS from '../../../../web3/assets/chains.json'
import { useAccount } from '../../../../web3/hooks/useAccount'
import { useSnackbarCallback } from '../../../../extension/options-page/DashboardDialogs/Base'

const useStyles = makeStyles((theme: Theme) => ({
    paper: {
        width: '750px !important',
        maxWidth: 'unset',
    },
    content: {
        padding: theme.spacing(4, 4.5, 2),
    },
    step: {
        flexGrow: 1,
        marginTop: 21,
    },
    stepTitle: {
        fontSize: 19,
        fontWeight: 'bold',
    },
    stepContent: {
        marginTop: 21,
    },
    networkList: {
        display: 'flex',
        gap: 32,
    },
    network: {
        position: 'relative',
        cursor: 'pointer',
        width: 'auto',
        padding: 0,
    },
    networkIcon: {
        height: 48,
        width: 48,
    },
    checkedBadge: {
        position: 'absolute',
        right: 0,
        bottom: 0,
        width: 16,
        height: 16,
        background: '#fff',
        borderRadius: '50%',
        border: '2px solid #fff',
    },
    grid: {
        width: '100%',
        margin: theme.spacing(2, 0, 0),
    },
    icon: {
        fontSize: 45,
    },
    tip: {
        fontSize: 12,
    },
}))

const networks = [
    NetworkType.Ethereum,
    Flags.bsc_enabled ? NetworkType.Binance : undefined,
    Flags.polygon_enabled ? NetworkType.Polygon : undefined,
].filter(Boolean) as NetworkType[]

interface SelectProviderDialogUIProps extends withClasses<never> {}

function SelectProviderDialogUI(props: SelectProviderDialogUIProps) {
    const { t } = useI18N()
    const classes = useStylesExtends(useStyles(), props)

    const account = useAccount()
    const history = useHistory()

    //#region remote controlled dialog logic
    const { open, closeDialog } = useRemoteControlledDialog(WalletMessages.events.selectProviderDialogUpdated)
    //#endregion

    //#region select wallet dialog
    const { openDialog: openSelectWalletDialog } = useRemoteControlledDialog(
        WalletMessages.events.selectWalletDialogUpdated,
    )
    //#endregion

    //#region wallet connect QR code dialog
    const { setDialog: setWalletConnectDialog } = useRemoteControlledDialog(
        WalletMessages.events.walletConnectQRCodeDialogUpdated,
    )
    //#endregion

    const wallets = useWallets(ProviderType.Maskbook)
    const selectedNetworkType = useValueRef(currentSelectedWalletNetworkSettings)
    const selectedProviderType = useValueRef(currentSelectedWalletProviderSettings)

    const onSelectNetwork = useCallback(
        async (networkType: NetworkType) => {
            const chainId = resolveNetworkChainId(networkType)
            const chainDetailed = CHAINS.find((x) => x.chainId === chainId)
            if (!chainDetailed) throw new Error('The selected network is not supported.')
            if (selectedProviderType === ProviderType.Maskbook) currentMaskbookChainIdSettings.value = chainId
            currentSelectedWalletNetworkSettings.value = networkType
        },
        [account, selectedProviderType],
    )

    const onConnectProvider = useCallback(
        async (providerType: ProviderType) => {
            closeDialog()
            switch (providerType) {
                case ProviderType.Maskbook:
                    if (wallets.length > 0) {
                        openSelectWalletDialog()
                        return
                    }
                    if (isEnvironment(Environment.ManifestOptions))
                        history.push(`${DashboardRoute.Wallets}?create=${Date.now()}`)
                    else await Services.Welcome.openOptionsPage(DashboardRoute.Wallets, `create=${Date.now()}`)
                    break
                case ProviderType.MetaMask:
                    await Services.Ethereum.connectMetaMask()
                    break
                case ProviderType.WalletConnect:
                    setWalletConnectDialog({
                        open: true,
                        uri: await Services.Ethereum.createConnectionURI(),
                    })
                    break
                case ProviderType.CustomNetwork:
                    break
                default:
                    unreachable(providerType)
            }
        },
        [wallets, history, closeDialog, openSelectWalletDialog, setWalletConnectDialog],
    )

    return (
        <InjectedDialog title={t('plugin_wallet_select_provider_dialog_title')} open={open} onClose={closeDialog}>
            <DialogContent className={classes.content}>
                <Box className={classes.step}>
                    <Typography className={classes.stepTitle} variant="h2" component="h2">
                        1. Choose Network
                    </Typography>
                    <List className={classnames(classes.networkList, classes.stepContent)}>
                        {networks.map((network) => (
                            <ListItem
                                className={classes.network}
                                key={network}
                                onClick={() => onSelectNetwork(network)}>
                                <NetworkIcon networkType={network} />
                                {selectedNetworkType === network && <SuccessIcon className={classes.checkedBadge} />}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box className={classes.step}>
                    <Typography className={classes.stepTitle} variant="h2" component="h2">
                        {`${Flags.bsc_enabled ? '2. ' : ''}Choose Wallet`}
                    </Typography>
                    <ImageList
                        className={classnames(classes.stepContent, classes.grid)}
                        gap={16}
                        cols={3}
                        rowHeight={183}>
                        <ImageListItem>
                            <Provider
                                logo={<MaskbookIcon className={classes.icon} viewBox="0 0 45 45" />}
                                name="Mask Network"
                                onClick={() => onConnectProvider(ProviderType.Maskbook)}
                            />
                        </ImageListItem>
                        {Flags.metamask_support_enabled ? (
                            <ImageListItem>
                                <Provider
                                    logo={<MetaMaskIcon className={classes.icon} viewBox="0 0 45 45" />}
                                    name="MetaMask"
                                    onClick={() => onConnectProvider(ProviderType.MetaMask)}
                                />
                            </ImageListItem>
                        ) : null}
                        <ImageListItem>
                            <Provider
                                logo={<WalletConnectIcon className={classes.icon} viewBox="0 0 45 45" />}
                                name="WalletConnect"
                                onClick={() => onConnectProvider(ProviderType.WalletConnect)}
                            />
                        </ImageListItem>
                    </ImageList>
                </Box>
            </DialogContent>
            <DialogActions>
                <Typography className={classes.tip} color="textSecondary">
                    {t('plugin_wallet_connect_new_ethereum')}
                    <Link
                        color="primary"
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://ethereum.org/en/wallets/">
                        {t('plugin_wallet_connect_learn_more_wallets')}
                    </Link>
                </Typography>
            </DialogActions>
        </InjectedDialog>
    )
}

export interface SelectProviderDialogProps extends SelectProviderDialogUIProps {}

export function SelectProviderDialog(props: SelectProviderDialogProps) {
    return <SelectProviderDialogUI {...props} />
}
