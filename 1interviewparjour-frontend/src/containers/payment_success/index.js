function PaymentSuccess({
    verifyIdentityAction,
    buyAction,
    identityVerified,
    problemData,
    stripePubKey
}) {

    return (
        <PaymentSuccessComponent
            verifyIdentity={verifyIdentityAction}
            buy={buyAction}
            identityVerified={identityVerified}
            problemData={problemData}
            stripePubKey={stripePubKey}
        />
    )
}

export default PaymentSuccess