import { Redirect } from 'expo-router'

// The only entry into the app.
export default function Index() {
  return <Redirect href="/(tabs)/feed" />
}
