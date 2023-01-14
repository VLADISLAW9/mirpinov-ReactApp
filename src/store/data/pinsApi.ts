import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/dist/query/react'
import { IPins } from '../../models/IPins'
import { IComments } from '../../models/IComments'
import { IUsers } from '../../models/IUsers'
import { IProfile } from '../../models/IProfile'

export const pinsApi = createApi({
	reducerPath: 'pinsApi',
	baseQuery: fetchBaseQuery({ baseUrl: 'http://localhost:5000/' }),
	tagTypes: ['Pin'],
	endpoints: build => ({
		fetchAllPins: build.query<IPins[], string>({
			query: () => ({
				url: '/pins',
			}),
			providesTags: result => ['Pin'],
		}),
		createPin: build.mutation<IPins, IPins>({
			query: pin => ({
				url: '/pins',
				method: 'POST',
				body: pin,
			}),
			invalidatesTags: ['Pin'],
		}),
		searchPins: build.query<IPins[], string>({
			query: (search: string) => ({
				url: '/pins',
				params: {
					q: search,
				},
			}),
		}),
		fetchPinId: build.query<any, number>({
			query: (id: number) => ({
				url: `/pins/${id}`,
			}),
			providesTags: result => ['Pin'],
		}),
		fetchCommentsPinId: build.query<any, number>({
			query: (id: number) => ({
				url: `/pins/${id}/comments`,
			}),
			providesTags: result => ['Pin'],
		}),
		createComments: build.mutation<IComments, IComments>({
			query: comment => ({
				url: '/comments',
				method: 'POST',
				body: comment,
			}),
			invalidatesTags: ['Pin'],
		}),
		fetchUserPin: build.query<IUsers[], number>({
			query: (userId: number) => ({
				url: `/users?id=${userId}`,
			}),
		}),
		fetchUserIdPin: build.query<IUsers[], number>({
			query: (id: number) => ({
				url: `/users?id=${id}`,
			}),
		}),
		fetchPinsUserId: build.query<IPins[], number>({
			query: (id: number) => ({
				url: `/users/${id}/pins`,
			}),
		}),
		subUser: build.mutation<IUsers, IUsers>({
			query: user => ({
				url: `/subscriptions`,
				method: 'POST',
				body: user,
			}),
		}),
		unSub: build.mutation<IUsers, number | undefined>({
			query: (id: number) => ({
				url: `/subscriptions/${id}`,
				method: 'DELETE',
			}),
		}),
		fetchSubscriptions: build.query<any, string>({
			query: () => ({
				url: `/subscriptions`,
			}),
		}),
		fetchProfileData: build.query<IProfile, string>({
			query: () => ({
				url: '/myProfile',
			}),
		}),
		editProfileData: build.mutation<IProfile, IProfile>({
			query: data => ({
				url: '/myProfile',
				method: 'POST',
				body: data,
			}),
		}),
		fetchMyPins: build.query<IPins[], string>({
			query: () => ({
				url: `/pins?myPin=true`,
			}),
		}),
	}),
})

export const { useSearchPinsQuery } = pinsApi
