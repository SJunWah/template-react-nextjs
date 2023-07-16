import React from 'react'
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useTheme, Badge, Button as MButton } from '@nextui-org/react'
import { useIntl } from 'react-intl'
import { useMediaQuery } from 'react-responsive'
import { IoWalletOutline } from 'react-icons/io5'

export const ConnectWallet: React.FC = () => {
  const intl = useIntl()
  const { theme } = useTheme()
  const isShowAddr = useMediaQuery({ query: `(max-width: 767px)` })

  return <ConnectButton.Custom>
    {({
      account,
      chain,
      openAccountModal,
      openChainModal,
      openConnectModal,
      authenticationStatus,
      mounted,
    }) => {
      // Note: If your app doesn't use authentication, you
      // can remove all 'authenticationStatus' checks
      const ready = mounted && authenticationStatus !== 'loading'
      const connected =
        ready &&
        account &&
        chain &&
        (!authenticationStatus ||
          authenticationStatus === 'authenticated')

      return (
        <div
          {...(!ready && {
            'aria-hidden': true,
            'style': {
              opacity: 0,
              pointerEvents: 'none',
              userSelect: 'none',
            },
          })}
        >
          {(() => {
            if (!connected) {
              return (
                <MButton
                  onClick={openConnectModal}
                  style={{
                    background: "var(--yellowColor)",
                    color: "var(--blackColor)",
                    height: '40px',
                    borderRadius: "0px",
                    fontFamily: "var(--fontFamily1)"
                  }}
                >
                  {intl.formatMessage({ id: "connectWallet", defaultMessage: "Connect Wallet" })}
                </MButton>
              )
            }
            if (chain.unsupported) {
              return (
                <MButton
                  color="red"
                  onClick={openChainModal}
                  style={{
                    height: '40px',
                    borderRadius: "0px",
                    fontFamily: "var(--fontFamily1)"
                  }}
                >
                  {intl.formatMessage({ id: "wrongNetwork", defaultMessage: "Wrong Network" })}
                </MButton>
              )
            }

            return (
              <Flex
                gap="xs"
                justify="center"
                align="center"
                direction="row"
                wrap="wrap"
              >
                <MButton
                  onClick={openChainModal}
                  style={{
                    background: theme?.colors.primary.value,
                    color: "var(--blackColor)",
                    height: '40px',
                    borderRadius: "0px",
                    fontFamily: "var(--fontFamily1)"
                  }}
                >
                  <Badge variant="dot" shape="circle" size="xs" css={{ marginRight: '10px' }} /> <img
                    alt={chain.name ?? 'Chain icon'}
                    src={chain.iconUrl}
                    style={{ width: '26px', height: '26px', fontFamily: "var(--fontFamily1)" }}
                  />
                </MButton>

                <MButton
                  onClick={openAccountModal}
                  style={{
                    background: theme?.colors.primary.value,
                    color: "var(--blackColor)",
                    height: '40px',
                    borderRadius: "0px",
                    fontFamily: "var(--fontFamily1)"
                  }}
                >
                  {!isShowAddr ? account.displayName : <IoWalletOutline fontSize="30px" />}
                </MButton>
              </Flex>
            )
          })()}
        </div>
      )
    }}
  </ConnectButton.Custom>
}