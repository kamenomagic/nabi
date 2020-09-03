import getEnvVars from "../environment";
import * as Requests from "./Requests"
const { stripeKey } = getEnvVars();
var stripe = require("stripe-client")(stripeKey);

export function signUp(onSuccess, onError, email, password) {
  Requests.httpPost(onSuccess, onError, "/users", { email, password });
}

export function login(onSuccess, onError, email, password) {
  Requests.httpPost(onSuccess, onError, "/users/sign_in", { email, password });
}

export function getProfile(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/users/validate_token");
}

export function editProfile(onSuccess, onError, profile) {
  Requests.httpPatch(onSuccess, onError, "/users", profile);
}

export function editProfileImage(onSuccess, onError, imagePath) {
  const formData = new FormData();
  formData.append("image", {
    name: imagePath,
    uri: imagePath,
  });
  Requests.httpPatchImage(onSuccess, onError, "/users", formData);
}

export function createFeedback(onSuccess, onError, feedback_type, comment) {
  Requests.httpPost(onSuccess, onError, "/feedback", { feedback_type, comment });
}

export function getBusinessTypes(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/business_types");
}

export function getFeedbackTypes(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/feedback_types");
}

export function forgotPassword(onSuccess, onError, email) {
  Requests.httpPost(onSuccess, onError, "/users/password", {
    email,
    redirect_url: Requests.urlFromPath("/users/password/reset"),
  });
}

export function deleteSource(onSuccess, onError, id) {
  Requests.httpDelete(onSuccess, onError, `/stripe/payment_methods/${id}`)
}

export function updateDefaultSource(onSuccess, onError, id) {
  Requests.httpPatch(onSuccess, onError, `/stripe/payment_methods/${id}`)
}

export function addSource(onSuccess, onError, cardForm) {
  stripe
    .createToken({
      card: {
        number: cardForm.values.number,
        exp_month: cardForm.values.expiry.split("/")[0],
        exp_year: cardForm.values.expiry.split("/")[1],
        cvc: cardForm.values.cvc,
        name: cardForm.values.name,
      },
    })
    .then((response) => {
      Requests.httpPost(onSuccess, onError, "/stripe/payment_methods", {
        token: response.id,
      });
    })
    .catch((error) => onError(error));
}

export function getPlans(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/stripe/plans");
}

export function subscribe(onSuccess, onError, plan) {
  Requests.httpPost(onSuccess, onError, `/stripe/subscriptions/${plan}`);
}

export function unsubscribe(onSuccess, onError) {
  Requests.httpDelete(onSuccess, onError, "/stripe/subscriptions");
}

export function createAlarm(onSuccess, onError, services) {
  Requests.httpPost(onSuccess, onError, "/noonlight/alarms", services);
}

export function cancelAlarm(onSuccess, onError) {
  Requests.httpDelete(onSuccess, onError, "/noonlight/alarm");
}

export function getAlarm(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/noonlight/alarm");
}

export function getTerms(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/legal/terms");
}

export function getUserTypes(onSuccess, onError) {
  Requests.httpGet(onSuccess, onError, "/user_types");
}

export function acceptInvitation(onSuccess, onError, invitation) {
  Requests.httpGet(onSuccess, onError, `/invitations/${invitation.id}/accept`);
}

export function rejectOrCancelInvitation(onSuccess, onError, invitation) {
  Requests.httpDelete(onSuccess, onError, `/invitations/${invitation.id}`);
}

export function deleteParent(onSuccess, onError) {
  Requests.httpDelete(onSuccess, onError, '/users/parent');
}