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
} from 'antd'
import type { TableColumnsType } from 'antd'
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

const { Title } = Typography
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
    { title: 'Week', dataIndex: 'week', key: 'week' },
    { title: 'Day', dataIndex: 'day', key: 'day' },
    { title: 'Meal Type', dataIndex: 'mealType', key: 'mealType' },
    { title: 'Recipe Title', dataIndex: 'title', key: 'title' },
    {
      title: 'Source',
      dataIndex: 'sourceUrl',
      key: 'sourceUrl',
      render: (url: string) =>
        url ? (
          <a href={url} target="_blank" rel="noreferrer">
            View
          </a>
        ) : (
          '-'
        ),
    },
    {
      title: 'Action',
      key: 'action',
      render: (_: unknown, record: FlattenedRecipe) => (
        <Popconfirm
          title="Delete this meal plan?"
          onConfirm={() => handleDelete(record.planId)}
          okText="Yes"
          cancelText="No"
        >
          <a style={{ color: 'red' }}>Delete</a>
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
      <div style={{ padding: '24px' }}>
        <Title level={3}>My Meal Plans</Title>

        <DataTable<FlattenedRecipe> columns={columns} data={flattenedData} />

        <Title level={3} style={{ marginTop: '32px' }}>
          Add New Meal Plan
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
            label="Week"
            name="week"
            rules={[{ required: true, message: 'Week is required' }]}
          >
            <Input placeholder="e.g. 2026-W07" />
          </Form.Item>

          {recipes.map((_, index) => (
            <div
              key={index}
              style={{
                border: '1px solid #d9d9d9',
                borderRadius: '8px',
                padding: '16px',
                marginBottom: '16px',
              }}
            >
              <Title level={4}>Recipe {index + 1}</Title>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Recipe ID"
                    name={['recipes', index, 'recipeId']}
                    rules={[
                      { required: true, message: 'Recipe ID is required' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Day"
                    name={['recipes', index, 'day']}
                    rules={[{ required: true, message: 'Day is required' }]}
                  >
                    <Select placeholder="Select Day">
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
                <Col span={12}>
                  <Form.Item
                    label="Meal Type"
                    name={['recipes', index, 'mealType']}
                    rules={[
                      { required: true, message: 'Meal Type is required' },
                    ]}
                  >
                    <Select placeholder="Select Meal Type">
                      {Object.values(MealType).map((type) => (
                        <Option key={type} value={type}>
                          {type}
                        </Option>
                      ))}
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Recipe Title"
                    name={['recipes', index, 'recipeDetails', 'title']}
                    rules={[
                      { required: true, message: 'Recipe Title is required' },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
                <Col span={12}>
                  <Form.Item
                    label="Recipe Image URL"
                    name={['recipes', index, 'recipeDetails', 'image']}
                    rules={[{ type: 'url', message: 'Invalid image URL' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={16}>
                <Col span={12}>
                  <Form.Item
                    label="Recipe Source URL"
                    name={['recipes', index, 'recipeDetails', 'sourceUrl']}
                    rules={[{ type: 'url', message: 'Invalid source URL' }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>
              </Row>

              {recipes.length > 1 && (
                <Button
                  type="dashed"
                  danger
                  onClick={() => handleRemoveRecipe(index)}
                >
                  Remove Recipe
                </Button>
              )}
            </div>
          ))}

          <Form.Item>
            <Button type="dashed" onClick={handleAddRecipe}>
              + Add Another Recipe
            </Button>
          </Form.Item>

          <Form.Item>
            <Button type="primary" htmlType="submit">
              Submit Meal Plan
            </Button>
          </Form.Item>
        </Form>
      </div>
    </Layout>
  )
}
