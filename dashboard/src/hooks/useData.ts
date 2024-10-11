/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from "react"
import { TSection } from "../types/section"
import axios from "axios"

const useData = (type: TSection | null = null) => {
  const [data, setData] = useState<any>(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<any>(null)
  const path = import.meta.env.VITE_API_URL

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true)
      try {
        const response = await axios.get(type ? `${path}/text/data/${type}` : `${path}/text/data`, {
          headers: {
            'Access-Control-Allow-Origin': '*', // Allow all origins
          }
        })
        const data = await response.data
        setData(data)
      } catch (error) {
        setError(error)
      } finally {
        setLoading(false)
      }
    }
    fetchData()
  }, [path, type])

  return { data, loading, error }
}

export default useData