import './CouponCard.css'


function CouponCard({ coupon, onApply, isApplied, showButton = true, showDescription = true }) {
  return (
    <div className={`coupon-card ${isApplied ? "applied" : ""}`} title={!showDescription ? coupon.label : undefined}>
      <div className="coupon-card-text">
        <span className="coupon-code">{coupon.code}</span>
        {showDescription && <p>{coupon.label}</p>}
      </div>
      {showButton && (
        <button onClick={() => onApply(coupon.code)} disabled={isApplied}>
          {isApplied ? "Applied" : "Apply"}
        </button>
      )}
    </div>
  );
}

export default CouponCard;