
import TextComparasion from "./general/TextComparasion"
import useData from "../hooks/useData"
const Dashboard = () => {
  const { data, loading, error } = useData()

  if (loading) return <div className="text-center text-3xl font-semibold text-white h-screen flex items-center justify-center">Loading...</div>
  if (error) return <div>Error: {error?.message}</div>
  if (data) return (
    <section className="flex gap-4 bg-slate-700 h-screen py-4 px-20">
      <TextComparasion originalText={data?.originalTextBrief} updatedText={data?.updatedTextBrief} changes={data?.changes} />
    </section>
  )
  return <div>No data</div>
}

export default Dashboard