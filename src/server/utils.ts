/**  Utility function to validate email format */
export function validateEmail(email: string): boolean {
    const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}


/**  Expiry date for Authenticated users  */
export const expires = new Date(Date.now() + 6 * 30 * 24 * 60 * 60 * 1000);  // 6 months