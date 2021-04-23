import {
    createStyles,
    makeStyles,
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Typography,
    Link,
} from '@material-ui/core'
import type { Order } from 'opensea-js/lib/types'
import { Image } from '../../../components/shared/Image'
import { useChainId } from '../../../web3/hooks/useChainId'
import type { useAsset } from '../hooks/useAsset'
import { resolveAssetLinkOnOpenSea } from '../pipes'

const useStyles = makeStyles((theme) =>
    createStyles({
        itemInfo: {
            display: 'flex',
            alignItems: 'center',
        },
        texts: {
            marginLeft: theme.spacing(1),
        },
    }),
)

export interface CheckoutOrderProps {
    asset?: ReturnType<typeof useAsset>
}

export function CheckoutOrder(props: CheckoutOrderProps) {
    const { asset } = props
    const order = asset?.value?.order_ as Order | undefined

    const classes = useStyles()
    const chainId = useChainId()

    if (!asset?.value) return null
    if (!order) return null

    return (
        <Table size="small">
            <TableHead>
                <TableRow>
                    <TableCell>Item</TableCell>
                    <TableCell align="right">Subtotal</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                <TableRow>
                    <TableCell>
                        <div className={classes.itemInfo}>
                            <Image height={80} width={80} src={asset.value.image_url} />
                            <div className={classes.texts}>
                                <Typography>{asset.value.collection_name ?? ''}</Typography>
                                {asset.value.token_address && asset.value.token_id ? (
                                    <Link
                                        color="primary"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        href={resolveAssetLinkOnOpenSea(
                                            chainId,
                                            asset.value.token_address,
                                            asset.value.token_id,
                                        )}>
                                        <Typography>{asset.value.name ?? ''}</Typography>
                                    </Link>
                                ) : (
                                    <Typography>{asset.value.name ?? ''}</Typography>
                                )}
                            </div>
                        </div>
                    </TableCell>
                    <TableCell align="right">
                        <Typography>
                            {asset.value.current_price} {asset.value.current_symbol}
                        </Typography>
                    </TableCell>
                </TableRow>
                <TableRow>
                    <TableCell>
                        <Typography>Total</Typography>
                    </TableCell>
                    <TableCell align="right">
                        <Typography>
                            {asset.value.current_price} {asset.value.current_symbol}
                        </Typography>
                    </TableCell>
                </TableRow>
            </TableBody>
        </Table>
    )
}