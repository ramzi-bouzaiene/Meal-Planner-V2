import React, { useState, useEffect } from 'react'
import { Button, Form, Input, Upload, message, Typography, Empty } from 'antd'
import { PlusOutlined, StarFilled, LinkOutlined, EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Favorite } from '../types/favoriteTypes'
import {
  addFavorite,
  deleteFavorite,
  getAllFavorites,
  updateFavorite,
} from '../services/favoriteService'
import { CustomModal } from '../Components/Modal/Modal'
import { DataTable } from '../Components/DataTable/DataTable'
import Layout from '../Components/Layout/Layout'
import { getFavoriteById } from '../services/favoriteService'

const { Title, Paragraph } = Typography

interface FavoriteDisplay {
  id: string
  title: string
  image: string
  sourceUrl: string
}

export const Favorites = () => {
  const columns = [
    {
      title: 'Recipe',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: '#1e293b' }}>{text}</span>
      )
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (url: string) => url ? (
        <img
          src={url}
          alt="Recipe"
          style={{
            width: 50,
            height: 50,
            borderRadius: 8,
            objectFit: 'cover'
          }}
        />
      ) : (
        <div style={{
          width: 50,
          height: 50,
          borderRadius: 8,
          background: '#f1f5f9',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          color: '#94a3b8'
        }}>
          🍽️
        </div>
      )
    },
    {
      title: 'Source',
      dataIndex: 'sourceUrl',
      key: 'sourceUrl',
      render: (url: string) => url ? (
        <a
          href={url}
          target="_blank"
          rel="noreferrer"
          style={{
            color: '#6366f1',
            display: 'flex',
            alignItems: 'center',
            gap: 4
          }}
        >
          <LinkOutlined /> View Recipe
        </a>
      ) : '-'
    },
    {
      title: 'Actions',
      dataIndex: '',
      key: 'x',
      render: (_: unknown, record: { id: string }) => (
        <div style={{ display: 'flex', gap: 12 }}>
          <Button
            type="text"
            icon={<EditOutlined />}
            onClick={() => showUpdateModal(record.id)}
            style={{ color: '#6366f1' }}
          >
            Edit
          </Button>
          <Button
            type="text"
            danger
            icon={<DeleteOutlined />}
            onClick={() => showDeleteModal(record.id)}
          >
            Delete
          </Button>
        </div>
      ),
    },
  ]
  const [open, setOpen] = useState(false)
  const [favoriteId, setFavoriteId] = useState('')
  const [openDeleteModal, setOpenDeleteModal] = useState(false)
  const [openUpdateModal, setOpenUpdateModal] = useState(false)
  const [favoriteData, setFavoriteData] = useState<FavoriteDisplay[]>([])
  const [favoriteDetails, setFavoriteDetails] = useState<Favorite>({
    userId: null,
    recipeId: '',
    recipeDetails: {
      title: '',
      image: '',
      sourceUrl: '',
    },
  })
  const [formData, setFormData] = useState({
    userId: '',
    recipeId: '',
    recipeDetails: {
      title: '',
      image: '',
      sourceUrl: '',
    },
  })
  const normFile = (e: { fileList: unknown[] } | unknown[]) => {
    if (Array.isArray(e)) {
      return e
    }
    return (e as { fileList: unknown[] })?.fileList
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log('name, value', name, value)
    setFormData((prevData) => ({
      ...prevData,
      recipeDetails: {
        ...prevData.recipeDetails,
        [name]: value,
      },
    }))
  }

  const handleFavoriteChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log('name, value', name, value)

    setFavoriteDetails((prevData) => ({
      ...prevData,
      recipeDetails: {
        ...prevData.recipeDetails,
        [name]: value,
      },
    }))
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleUploadChange = (info: any) => {
    if (info.fileList.length > 0) {
      setFormData((prevData) => ({
        ...prevData,
        recipeDetails: {
          ...prevData.recipeDetails,
          image: info.fileList[0]?.originFileObj || '',
        },
      }))
    }
  }

  const handleSubmit = async () => {
    const userId = localStorage.getItem('userId')
    const updatedValues = { ...formData, userId }
    try {
      const response = await addFavorite(updatedValues)

      if (response?.message) {
        message.success('Favorite added successfully.')
        setFormData({
          userId: '',
          recipeId: '',
          recipeDetails: {
            title: '',
            image: '',
            sourceUrl: '',
          },
        })
        await fetchFavorites()
        closeModal()
      } else {
        message.error('An error occurred while submitting the form.')
      }
    } catch (error) {
      message.error('An error occurred while submitting the form.', error)
    }
  }

  const fetchFavorites = async () => {
    const response = await getAllFavorites()
    console.log('fav res', response.favorite)

    const formattedData = response.favorite
      .map((res: Favorite) => {
        const recipes = Array.isArray(res.recipeDetails)
          ? res.recipeDetails
          : [res.recipeDetails]

        return recipes.map((recipe) => ({
          ...recipe,
          id: res._id,
        }))
      })
      .flat()

    setFavoriteData(formattedData)
  }
  const handleDelete = async () => {
    try {
      console.log('handleDelete id:', favoriteId)
      const response = await deleteFavorite(favoriteId)
      if (response?.message) {
        clodeDeleteModal()
        message.success('Favorite deleted successfully.')
        await fetchFavorites()
      } else {
        message.error('An error occurred while deleting favorite')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const handleUpdate = async () => {
    try {
      const userId = localStorage.getItem('userId')
      const updatedData = {
        ...favoriteDetails,
        userId,
      }
      console.log('updatedData', updatedData)
      const response = await updateFavorite(updatedData)
      if (response?.message) {
        clodeUpdateModal()
        message.success('Favorite updated successfully.')
        await fetchFavorites()
      } else {
        message.error('An error occurred while updating favorite')
      }
    } catch (error) {
      console.error(error)
    }
  }

  const showModal = () => {
    setOpen(true)
  }

  const closeModal = () => {
    setOpen(false)
  }

  const showDeleteModal = (id: string) => {
    setOpenDeleteModal(true)
    setFavoriteId(id)
    console.log('showDeleteModal id:', id)
  }

  const clodeDeleteModal = () => {
    setOpenDeleteModal(false)
  }

  const clodeUpdateModal = () => {
    setOpenUpdateModal(false)
  }

  const showUpdateModal = async (id: string) => {
    setFavoriteId(id)
    setOpenUpdateModal(true)
    try {
      const response = await getFavoriteById(id)
      setFavoriteDetails(response.favorite)
    } catch (error) {
      console.error('Error fetching favorite details:', error)
    }
  }

  useEffect(() => {
    fetchFavorites()
  }, [])

  return (
    <Layout>
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <Title level={2} className="page-title">
              <StarFilled style={{ color: '#f59e0b' }} />
              My Favorites
            </Title>
            <Paragraph className="page-description">
              Your collection of favorite recipes
            </Paragraph>
          </div>
          <Button
            type="primary"
            icon={<PlusOutlined />}
            onClick={showModal}
            className="add-button"
            size="large"
          >
            Add Recipe
          </Button>
        </div>

        {/* Table Container */}
        <div className="table-container">
          {favoriteData.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div className="empty-state">
                  <p className="empty-state-title">No favorites yet</p>
                  <p className="empty-state-description">
                    Start adding your favorite recipes to build your collection!
                  </p>
                </div>
              }
            >
              <Button type="primary" onClick={showModal}>
                Add Your First Recipe
              </Button>
            </Empty>
          ) : (
            <DataTable
              columns={columns}
              data={favoriteData.map((item) => ({
                ...item,
                key: item.id,
              }))}
            />
          )}
        </div>

        {/* Update Modal */}
        <CustomModal
          title="Edit Recipe"
          openModal={openUpdateModal}
          handleModal={clodeUpdateModal}
          handleOk={handleUpdate}
        >
          <Form layout="vertical">
            <Form.Item label="Recipe Title">
              <Input
                name="title"
                value={favoriteDetails?.recipeDetails?.title || ''}
                onChange={handleFavoriteChange}
                placeholder="Enter recipe title"
              />
            </Form.Item>
            <Form.Item
              label="Recipe Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                onChange={handleUploadChange}
              >
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item label="Source URL">
              <Input
                name="sourceUrl"
                value={favoriteDetails?.recipeDetails?.sourceUrl || ''}
                onChange={handleFavoriteChange}
                placeholder="https://example.com/recipe"
              />
            </Form.Item>
          </Form>
        </CustomModal>

        {/* Delete Modal */}
        <CustomModal
          title="Delete Recipe"
          openModal={openDeleteModal}
          handleModal={clodeDeleteModal}
          handleOk={handleDelete}
        >
          <div style={{ textAlign: 'center', padding: '20px 0' }}>
            <DeleteOutlined style={{ fontSize: 48, color: '#ef4444', marginBottom: 16 }} />
            <p style={{ fontSize: 16, color: '#475569' }}>
              Are you sure you want to delete this recipe from your favorites?
            </p>
            <p style={{ color: '#94a3b8' }}>This action cannot be undone.</p>
          </div>
        </CustomModal>

        {/* Add Modal */}
        <CustomModal
          title="Add New Recipe"
          openModal={open}
          handleModal={closeModal}
          handleOk={handleSubmit}
        >
          <Form layout="vertical">
            <Form.Item label="Recipe Title">
              <Input
                name="title"
                value={formData.recipeDetails.title}
                onChange={handleInputChange}
                placeholder="Enter recipe title"
              />
            </Form.Item>
            <Form.Item
              label="Recipe Image"
              valuePropName="fileList"
              getValueFromEvent={normFile}
            >
              <Upload
                action="/upload.do"
                listType="picture-card"
                onChange={handleUploadChange}
              >
                <button style={{ border: 0, background: 'none' }} type="button">
                  <PlusOutlined />
                  <div style={{ marginTop: 8 }}>Upload</div>
                </button>
              </Upload>
            </Form.Item>
            <Form.Item label="Source URL">
              <Input
                name="sourceUrl"
                value={formData.recipeDetails.sourceUrl}
                onChange={handleInputChange}
                placeholder="https://example.com/recipe"
              />
            </Form.Item>
          </Form>
        </CustomModal>
      </div>
    </Layout>
  )
}
