import { useCallback, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'
import { Button } from '../../components/button/button.component'
import { Header } from '../../components/header/header.component'
import DefaultLayout from '../../components/DefaultLayout/DefaultLayout'
import { withAuth } from '../../components/withauth.component'
import $api from '../../helpers/api'
import '../index/index.page.css'

const Dashboard = (props) => {
  const { user } = props
  const [marketers, setMarketers] = useState([])

  const getMarketers = useCallback(() => {
    $api
      .$get('/marketers')
      .then(({ marketers }) => setMarketers(marketers))
      .catch((err) => {
        if (err.status !== 403) {
          toast.error(err.message, { autoClose: false })
        }
      })
  }, [])

  useEffect(() => {
    getMarketers()
  }, [getMarketers])

  const deleteMarketer = (username) => {
    return () => {
      const shouldDelete = window.confirm(
        'Are you sure you want to permanently delete this marketer?',
      )
      if (shouldDelete) {
        setMarketers(marketers.filter((m) => m.username !== username))
        $api
          .$delete(`/marketers/${username}`)
          .then(() => {
            toast.success('Marketer deleted successfully')
            getMarketers()
          })
          .catch((err) => {
            if (err.status !== 403) {
              toast.error(err.message)
            }
          })
      }
    }
  }

  return (
    <div className="Dashboard-section">
      <DefaultLayout />
      <main className="dashboard-right-content">
        <div className="">
          <Header user={user} />
          <div className="dashboard-details">
            <div className="dashboard-table">
              <h1>Marketing Consultants</h1>
              <div className="dashboard-button-flex">
                <Button className="dashboard-button" type="submit">
                  <i class="bi bi-plus dashboard-plus-button"></i>
                  Add New Consultant Page
                </Button>
              </div>
              <div className="dashboard-table-details">
                <div className="dashboard-search-input">
                  <input placeholder="Search" className="search-input" />
                  <i class="bi bi-search search-icon"></i>
                </div>
                <table style={{ width: '100%' }}>
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Phone No</th>
                      <th>Username</th>
                      <th></th>
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {marketers.map((marketer) => {
                      return (
                        <tr key={marketer.marketing_consultant_id}>
                          <td>
                            {marketer.firstname} {marketer.lastname}
                          </td>
                          <td>{marketer.email}</td>
                          <td>{marketer.phonenumber}</td>
                          <td>{marketer.username}</td>
                          <td>
                            <i
                              class="bi bi-trash-fill trash-icon"
                              onClick={deleteMarketer(marketer.username)}
                            ></i>
                          </td>
                          <Link to={`/${marketer.marketing_consultant_id}`}>
                            <td>
                              <i class="bi bi-chevron-right trash-icon"></i>
                            </td>
                          </Link>
                        </tr>
                      )
                    })}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default withAuth(Dashboard)
