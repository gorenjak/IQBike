import { API_URL } from "../config/server";

export async function fetchStripeSubscriptionsActive(customerId) {
  try {
    const {subscriptions} = await fetch(
      `${API_URL}/subscriptions/` + customerId,
    ).then((r) => r.json());
    const activeSubscriptions = subscriptions.data.filter(
      (sub) => sub.status === 'active',
    );
    console.log(activeSubscriptions);
    if (activeSubscriptions[0]){
      console.log("Uporabnik ima aktivno naročnino. " + activeSubscriptions[0].plan.active);
      return activeSubscriptions[0].plan.active;
    } else {
      console.log("Ni aktivne naročnine");
      return;
    }
  } catch (error) {
    console.error('Error fetching Stripe subscriptions:', error);
  }
}
