import './RotatePhone.scss'
export function RotatePhone() {
    return (
        <div className="rotate-phone-warning">
            <p>
                Please rotate your phone to a <strong>Landscape</strong> orientation.
            </p>
            <div className="svg-container">
                <svg
                    fill="currentColor"
                    width="800px"
                    height="800px"
                    viewBox="0 0 32 32"
                    xmlns="http://www.w3.org/2000/svg"
                >
                    <path d="M20.629 5h-9.257a1.6 1.6 0 0 0-1.601 1.603V25.4a1.6 1.6 0 0 0 1.601 1.601h9.257c.883 0 1.6-.718 1.6-1.601V6.603c0-.885-.717-1.603-1.6-1.603zm-6.247 1.023h3.302v.768h-3.302v-.768zm1.619 19.395a1.024 1.024 0 0 1-1.023-1.021 1.023 1.023 0 0 1 2.044 0c-.001.494-.46 1.021-1.021 1.021zm5.028-3.501H10.971V7.704h10.058v14.213z" />
                </svg>
            </div>
        </div>
    )
}
