import { BehaviorSubject } from "rxjs";
import CryptoJS from "crypto-js";
import { fetchWrapper } from "../helper";
import { useRouter } from "next/navigation";

const baseUrl = process.env.BASE_URI;
const userSubject = new BehaviorSubject(getUserDetails());
const companySubject = new BehaviorSubject(getCompanyDetails());

const cryptkey = CryptoJS.enc.Utf8.parse("59mnS4w7crNu9TMaRtHN2YIaOVPrIwIi");
const cryptiv = CryptoJS.enc.Utf8.parse("vUYv2NQdLUbi7UpQ");

export const userService = {
  user: userSubject.asObservable(),
  get userValue() {
    return userSubject.value;
  },
  login,
  logout,
  register,
  checkUserValidation,
  restLoggedInUserData,
  getAll,
  getById,
  update,
  delete: _delete,
};

async function login(username, password, recaptcha) {
  let checking = "";

  // encrypt password
  var encrypt = CryptoJS.AES.encrypt(password, cryptkey, {
    iv: cryptiv,
    mode: CryptoJS.mode.CTR,
  });

  const pass = encrypt.toString();
  checking = await fetchWrapper
    .post(`${baseUrl}users/login`, {
      email: username,
      password: pass,
      recaptcha: recaptcha,
    })
    .then((user) => {
      // console.log("-------------------------");
      // console.log(user);
      // console.log("-------------------------");
      if (user !== false) {
        userSubject.next(user);
        companySubject.next(user);

        localStorage.setItem("user", JSON.stringify(user));

        localStorage.setItem("company", JSON.stringify(user));
      }
      return user;
    });
  return checking;
}

function checkUserValidation(user, navigation) {
  const router = useRouter();
  for (let i = 0; i < user.roles.features[0].features.length; i++) {
    if (user.roles.features[0].features[i].name === navigation) {
      return true;
    }
  }

  router.push("/");
  return false;
}

function logout() {
  const router = useRouter();
  localStorage.removeItem("user");
  localStorage.removeItem("company");
  userSubject.next(null);
  companySubject.next(null);
  router.push("/login");
}

function register(user) {
  return fetchWrapper.post(`${baseUrl}users/register`, user);
}

function getAll() {
  return fetchWrapper.get(baseUrl);
}

function getById(id) {
  return fetchWrapper.get(`${baseUrl}users/${id}`);
}

function update(id, params) {
  return fetchWrapper.put(`${baseUrl}users/${id}`, params).then((x) => {
    // update stored user if the logged in user updated their own record
    if (id === userSubject.value.id) {
      // update local storage
      const user = { ...userSubject.value, ...params };
      localStorage.setItem("user", JSON.stringify(user));

      // publish updated user to subscribers
      userSubject.next(user);
    }
    return x;
  });
}

// prefixed with underscored because delete is a reserved word in javascript
function _delete(id) {
  return fetchWrapper.delete(`${baseUrl}users/${id}`);
}

function getUserDetails() {
  try {
    return process.browser && JSON.parse(localStorage.getItem("user"));
  } catch (err) {
    console.error("Error:" + err.message);
  }
}

function getCompanyDetails() {
  try {
    return process.browser && JSON.parse(localStorage.getItem("company"));
  } catch (err) {
    console.error("Error:" + err.message);
  }
}

function restLoggedInUserData(first_name, last_name, email, phone_no) {
  const user = userSubject.value;
  const data = {
    first_name: first_name,
    last_name: last_name,
    email: email,
    phone_no: phone_no,
    nid_no: user.nid_no,
    companyId: user.companyId,
    companyLogo: user.companyLogo,
    companyName: user.companyName,
    company_id: user.company_id,
    created_at: user.created_at,
    employee_id: user.employee_id,
    gender: user.gender,
    id: user.id,
    is_biomatric: user.is_biomatric,
    is_push_notification: user.is_push_notification,
    is_verified: user.is_verified,
    role: user.role,
    roles: user.roles,
    status: user.status,
    token: user.token,
    updated_at: user.updated_at,
    user_img: user.user_img,
    username: user.username,
    verification_token: user.verification_token,
    verified_by: user.verified_by,
  };
  userSubject.next(data);
  companySubject.next(data);
  localStorage.setItem("user", JSON.stringify(data));
  localStorage.setItem("company", JSON.stringify(data));
}
