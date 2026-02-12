export const PAYMENT_CONFIG = {
    plans: {
        student: { price: 149, recommended: 'sbp', methods: ['sbp', 'card', 'tpay'] },
        basic: { price: 199, recommended: 'card', methods: ['card', 'sbp'] },
        premium: { price: 299, recommended: 'card_recurring', methods: ['card_recurring', 'sbp', 'tpay'] },
        family: { price: 499, recommended: 'card_recurring', methods: ['card_recurring', 'sbp'] }
    },
    methods: {
        sbp: { name: 'СБП', icon: 'fas fa-qrcode', description: 'Мгновенно, 0%' },
        card: { name: 'Карта', icon: 'fas fa-credit-card', description: 'Visa, MC, МИР', recurring: true },
        tpay: { name: 'T-Pay', icon: 'fas fa-building', description: 'Т-Банк' },
        card_recurring: { name: 'Автоплатёж', icon: 'fas fa-sync', description: 'Карта' }
    },
    trial: { days: 30, requireCard: true }
};

export function getPaymentMethodsForPlan(plan) {
    return PAYMENT_CONFIG.plans[plan]?.methods.map(id => PAYMENT_CONFIG.methods[id]) || [];
}
export function getRecommendedPaymentMethod(plan) {
    const rec = PAYMENT_CONFIG.plans[plan]?.recommended;
    return rec ? PAYMENT_CONFIG.methods[rec] : null;
}