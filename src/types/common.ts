export type XmlValue = string | Record<string, never> | undefined

export type PageExecute = () => Promise<void>
