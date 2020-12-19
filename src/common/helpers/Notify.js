import { notification } from 'antd'

notification.config({
  placement: 'bottomLeft'
})

export const checkError = (error) => {
  switch (typeof (error)) {
    case 'object': {
      if (Array.isArray(error)) {
        error.map((a) => (
          notification.error({
            message: a
          })
        ))
      } else {
        notification.error({
          message: error.message
        })
      }
      break
    }
    case 'string': {
      notification.error({
        message: error
      })
      break
    }
    default: {
      notification.error({
        message: 'Server Error'
      })
    }
  }
}

export const notify = ({ message, type }) => {
  notification[type]({
    message
  })
}
