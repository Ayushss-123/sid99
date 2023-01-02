import axios from 'axios';

const baseUrl = 'http://localhost:3333/api/v1/';

export async function saveUser(body) {
  return await axios.post(`${baseUrl}create/user`, body, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function fetchUsers({ page, limit }) {
  return await axios.get(`${baseUrl}fetch/users?page=${page}&limit=${limit}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function editUser(user) {
  return await axios.post(`${baseUrl}edit/user`, user, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function addCampaign(campaign) {
  return await axios.post(`${baseUrl}add/campaign`, campaign, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function fetchCampaings() {
  return await axios.get(`${baseUrl}fetch/campaign`, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function addUserCampaign(body) {
  return await axios.post(`${baseUrl}add/user/campaign`, body, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function userLogin(body) {
  return await axios.post(`${baseUrl}admin/login`, body, null);
}

export async function userLogout() {
  return await axios.post(`${baseUrl}user/logout`, { logout: true }, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function fetchSymptoms() {
  return await axios.get(`${baseUrl}list/symptom`, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function editSymptom(body) {
  return await axios.post(`${baseUrl}edit/symptom`, body, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function addSymptom(body) {
  return await axios.post(`${baseUrl}add/symptom`, body, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function fetchPatients({ page, limit }) {
  return await axios.get(`${baseUrl}search/patient?page=${page}&limit=${limit}`, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function fetchResultStates() {
  return await axios.get(`${baseUrl}list/test/states`, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function addResultState(body) {
  return await axios.post(`${baseUrl}add/result/state`, body, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

export async function editResultState(body) {
  return await axios.post(`${baseUrl}edit/result/state`, body, { headers: { "Authorization": `Bearer ${localStorage.getItem('user_token')}` }});
}

