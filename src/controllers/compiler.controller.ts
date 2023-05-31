import { Request, Response } from 'express'

export const runCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const url = 'http://localhost:8080/run'
    const data = JSON.stringify(req.body)
    // console.log(data)

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    const responseText = await result.json()
    console.log(responseText)

    if (responseText.status == 'success') {
      res.status(200).json({
        status: 'success',
        data: responseText
      })
      return
    }
    res.status(200).json({
      status: 'failed',
      data: responseText
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt run your code'
    })
  }
}

export const submitCode = async (req: Request, res: Response): Promise<void> => {
  try {
    const url = 'http://localhost:8080/run'
    const data = JSON.stringify(req.body)
    console.log(data)

    const result = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: data
    })
    const responseText = await result.json()
    console.log(responseText.status)

    if (result.status === 200) {
      res.status(200).json({
        status: 'success',
        data: responseText
      })
      return
    }
    res.status(400).json({
      status: 'failed',
      data: responseText
    })
  } catch (e: any) {
    console.log(e)
    res.status(500).json({
      status: 'error',
      data: 'Couldnt submit your code'
    })
  }
}
