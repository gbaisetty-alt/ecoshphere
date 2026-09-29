const profileKey = 'ecotrack-profile'

export function getProfile() {
  try {
    return JSON.parse(localStorage.getItem(profileKey)) || { name: 'Alex' }
  } catch {
    return { name: 'Alex' }
  }
}

export function saveProfile(profile) {
  localStorage.setItem(profileKey, JSON.stringify(profile))
  window.dispatchEvent(new CustomEvent('ecotrack-profile-updated', { detail: profile }))
}