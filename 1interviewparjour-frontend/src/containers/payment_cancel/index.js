function PaymentCancel({
    verifyIdentityAction,
    buyAction,
    identityVerified,
    problemData,
    stripePubKey
}) {

    return (
        <PaymentCancelComponent
            verifyIdentity={verifyIdentityAction}
            buy={buyAction}
            identityVerified={identityVerified}
            problemData={problemData}
            stripePubKey={stripePubKey}
        />
    )
}

export default PaymentCancel