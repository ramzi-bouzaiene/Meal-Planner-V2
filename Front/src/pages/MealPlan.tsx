import { useState, useEffect } from 'react'
import {
  Form,
  Input,
  Button,
  Select,
  Row,
  Col,
  Typography,
  message,
  Popconfirm,
  Card,
  Empty,
} from 'antd'
import type { TableColumnsType } from 'antd'
import {
  PlusOutlined,
  DeleteOutlined,
  CalendarFilled,
  LinkOutlined,
  CloseOutlined
} from '@ant-design/icons'
import { DayEnum } from '../enums/DaysOfWeek'
import { MealType } from '../enums/MealType'
import { MealPlan, RecipeInMealPlan } from '../types/mealPlanTypes'
import {
  addMealPlan,
  getAllMealPlans,
  deleteMealPlan,
} from '../services/mealPlanService'
import { DataTable } from '../Components/DataTable/DataTable'
import Layout from '../Components/Layout/Layout'

const { Title, Paragraph } = Typography
const { Option } = Select

interface FlattenedRecipe {
  key: string
  week: string
  day: string
  mealType: string
  title: string
  image: string
  sourceUrl: string
  planId: string
}

export const MealPlans = () => {
  const [form] = Form.useForm()
  const [mealPlans, setMealPlans] = useState<MealPlan[]>([])
  const [recipes, setRecipes] = useState([
    {
      recipeId: '',
      day: '' as DayEnum,
      mealType: '' as MealType,
      recipeDetails: {
        title: '',
        image: '',
        sourceUrl: '',
      },
    },
  ])

  const columns: TableColumnsType<FlattenedRecipe> = [
    {
      title: 'Week',
      dataIndex: 'week',
      key: 'week',
      render: (text: string) => (
        <span style={{
          background: '#e0e7ff',
          padding: '4px 12px',
          borderRadius: '20px',
          color: '#4338ca',
          fontWeight: 500,
          fontSize: '13px'
        }}>
          {text}
        </span>
      )
    },
    {
      title: 'Day',
      dataIndex: 'day',
      key: 'day',
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: '#1e293b' }}>{text}</span>
      )
    },
    {
      title: 'Meal',
      dataIndex: 'mealType',
      key: 'mealType',
      render: (text: string) => {
        const colors: Record<string, { bg: string; text: string }> = {
          breakfast: { bg: '#fef3c7', text: '#92400e' },
          lunch: { bg: '#d1fae5', text: '#065f46' },
          dinner: { bg: '#e0e7ff', text: '#3730a3' },
          snack: { bg: '#fce7f3', text: '#9d174d' },
        }
        const style = colors[text.toLowerCase()] || { bg: '#f1f5f9', text: '#475569' }
        return (
          <span style={{
            background: style.bg,
            color: style.text,
            padding: '4px 12px',
            borderRadius: '20px',
            fontWeight: 500,
            fontSize: '13px'
          }}>
            {text}
          </span>
        )
      }
    },
    {
      title: 'Recipe',
      dataIndex: 'title',
      key: 'title',
      render: (text: string) => (
        <span style={{ fontWeight: 500, color: '#1e293b' }}>{text}</span>
      )
    },
    {
      title: 'Source',
      dataIndex: 'sourceUrl',
      key: 'sourceUrl',
      render: (url: string) =>
        url ? (
          <a
            href={url}
            target="_blank"
            rel="noreferrer"
            style={{ color: '#6366f1', display: 'flex', alignItems: 'center', gap: 4 }}
          >
            <LinkOutlined /> View
          </a>
        ) : (
          <span style={{ color: '#94a3b8' }}>-</span>
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: FlattenedRecipe) => (
        <Popconfirm
          title="Delete this meal plan?"
          description="This action cannot be undone."
          onConfirm={() => handleDelete(record.planId)}
          okText="Delete"
          cancelText="Cancel"
          okButtonProps={{ danger: true }}
        >
          <Button type="text" danger icon={<DeleteOutlined />}>
            Delete
          </Button>
        </Popconfirm>
      ),
    },
  ]

  const fetchMealPlans = async () => {
    try {
      const response = await getAllMealPlans()
      const plans = response.meals || response
      setMealPlans(Array.isArray(plans) ? plans : [])
    } catch (error) {
      console.error('Failed to fetch meal plans:', error)
    }
  }

  const handleDelete = async (planId: string) => {
    try {
      await deleteMealPlan(planId)
      message.success('Meal Plan deleted successfully')
      await fetchMealPlans()
    } catch (error) {
      message.error('Failed to delete meal plan')
      console.error(error)
    }
  }

  const flattenedData: FlattenedRecipe[] = mealPlans.flatMap((plan) =>
    (plan.recipes || []).map((recipe: RecipeInMealPlan, idx: number) => ({
      key: `${plan._id}-${idx}`,
      week: plan.week,
      day: recipe.day,
      mealType: recipe.mealType,
      title: recipe.recipeDetails?.title || '',
      image: recipe.recipeDetails?.image || '',
      sourceUrl: recipe.recipeDetails?.sourceUrl || '',
      planId: plan._id || '',
    }))
  )

  const handleAddRecipe = () => {
    setRecipes([
      ...recipes,
      {
        recipeId: '',
        day: '' as DayEnum,
        mealType: '' as MealType,
        recipeDetails: {
          title: '',
          image: '',
          sourceUrl: '',
        },
      },
    ])
  }

  const handleRemoveRecipe = (index: number) => {
    const newRecipes = [...recipes]
    newRecipes.splice(index, 1)
    setRecipes(newRecipes)
  }

  const handleSubmit = async (values: { week: string; recipes: RecipeInMealPlan[] }) => {
    try {
      const userId = localStorage.getItem('userId')
      const mealPlanData = { ...values, userId } as MealPlan
      const response = await addMealPlan(mealPlanData)
      if (response.message) {
        message.success('Meal Plan added successfully')
        form.resetFields()
        setRecipes([
          {
            recipeId: '',
            day: '' as DayEnum,
            mealType: '' as MealType,
            recipeDetails: {
              title: '',
              image: '',
              sourceUrl: '',
            },
          },
        ])
        await fetchMealPlans()
      } else {
        message.error('An error occurred while submitting the form')
      }
    } catch (error) {
      message.error('An error occurred while submitting the form')
      console.error(error)
    }
  }

  useEffect(() => {
    fetchMealPlans()
  }, [])

  return (
    <Layout>
      <div className="page-container">
        {/* Page Header */}
        <div className="page-header">
          <div>
            <Title level={2} className="page-title">
              <CalendarFilled style={{ color: '#6366f1' }} />
              Meal Plans
            </Title>
            <Paragraph className="page-description">
              Organize your weekly meals and stay on track
            </Paragraph>
          </div>
        </div>

        {/* Current Meal Plans Table */}
        <div className="table-container" style={{ marginBottom: '32px' }}>
          <div className="table-header">
            <h3 className="table-title">📅 Your Meal Plans</h3>
          </div>
          {flattenedData.length === 0 ? (
            <Empty
              image={Empty.PRESENTED_IMAGE_SIMPLE}
              description={
                <div>
                  <p style={{ fontSize: 16, color: '#475569', marginBottom: 4 }}>No meal plans yet</p>
                  <p style={{ color: '#94a3b8' }}>Create your first meal plan below!</p>
                </div>
              }
            />
          ) : (
            <DataTable<FlattenedRecipe> columns={columns} data={flattenedData} />
          )}
        </div>

        {/* Add New Meal Plan Form */}
        <Card
          style={{
            borderRadius: '16px',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)'
          }}
        >
          <Title level={4} style={{ marginBottom: '24px', color: '#1e293b' }}>
            <PlusOutlined style={{ marginRight: 8, color: '#10b981' }} />
            Create New Meal Plan
          </Title>

          <Form
            form={form}
            onFinish={handleSubmit}
            initialValues={{
              week: '',
            }}
            layout="vertical"
          >
            <Form.Item
              label={<span style={{ fontWeight: 500 }}>Week</span>}
              name="week"
              rules={[{ required: true, message: 'Week is required' }]}
            >
              <Input
                placeholder="e.g. 2026-W07"
                style={{ maxWidth: 300 }}
              />
            </Form.Item>

            {recipes.map((_, index) => (
              <div
                key={index}
                className="recipe-card"
              >
                <div className="recipe-card-header">
                  <span className="recipe-card-number">
                    🍽️ Recipe {index + 1}
                  </span>
                  {recipes.length > 1 && (
                    <Button
                      type="text"
                      danger
                      icon={<CloseOutlined />}
                      onClick={() => handleRemoveRecipe(index)}
                      className="remove-recipe-btn"
                    >
                      Remove
                    </Button>
                  )}
                </div>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Recipe ID"
                      name={['recipes', index, 'recipeId']}
                      rules={[
                        { required: true, message: 'Recipe ID is required' },
                      ]}
                    >
                      <Input placeholder="Enter recipe ID" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Day"
                      name={['recipes', index, 'day']}
                      rules={[{ required: true, message: 'Day is required' }]}
                    >
                      <Select placeholder="Select day of the week">
                        {Object.values(DayEnum).map((day) => (
                          <Option key={day} value={day}>
                            {day}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Meal Type"
                      name={['recipes', index, 'mealType']}
                      rules={[
                        { required: true, message: 'Meal Type is required' },
                      ]}
                    >
                      <Select placeholder="Select meal type">
                        {Object.values(MealType).map((type) => (
                          <Option key={type} value={type}>
                            {type}
                          </Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Recipe Title"
                      name={['recipes', index, 'recipeDetails', 'title']}
                      rules={[
                        { required: true, message: 'Recipe Title is required' },
                      ]}
                    >
                      <Input placeholder="Enter recipe name" />
                    </Form.Item>
                  </Col>
                </Row>

                <Row gutter={16}>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Image URL"
                      name={['recipes', index, 'recipeDetails', 'image']}
                      rules={[{ type: 'url', message: 'Invalid image URL' }]}
                    >
                      <Input placeholder="https://example.com/image.jpg" />
                    </Form.Item>
                  </Col>
                  <Col xs={24} sm={12}>
                    <Form.Item
                      label="Source URL"
                      name={['recipes', index, 'recipeDetails', 'sourceUrl']}
                      rules={[{ type: 'url', message: 'Invalid source URL' }]}
                    >
                      <Input placeholder="https://example.com/recipe" />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}

            <Form.Item>
              <Button
                type="dashed"
                onClick={handleAddRecipe}
                icon={<PlusOutlined />}
                style={{ marginRight: 12 }}
              >
                Add Another Recipe
              </Button>
            </Form.Item>

            <Form.Item style={{ marginBottom: 0 }}>
              <Button
                type="primary"
                htmlType="submit"
                size="large"
                className="add-button"
              >
                Create Meal Plan
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </div>
    </Layout>
  )
}
