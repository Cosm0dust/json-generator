import {createApi, fetchBaseQuery, TagDescription} from "@reduxjs/toolkit/query/react";
import {buildObject, ISlot, RandomProps} from "../../typescripUtils/model";

export const savedApi= createApi({
    reducerPath: 'saved',
    tagTypes: ['Slots', 'Arrays'],
    baseQuery: fetchBaseQuery({
        baseUrl: 'http://localhost:3001'
    }),
    endpoints: build => ({
        getSlots: build.query<ISlot[], void>({
            query: () => ({
                url: `slots`
            }),
            providesTags: (result: ISlot[] | undefined): readonly TagDescription<"Slots">[] => {
                if (result && result.length > 0) {
                    return [
                        ...result.map(({ id }) => ({ type: 'Slots' as const, id })),
                        { type: 'Slots', id: 'LIST' },
                    ];
                } else {
                    return [{ type: 'Slots', id: 'LIST' }];
                }
            },
        }),
        saveSlot: build.mutation<any, ISlot>({
            query:({
                id,
                slotName
            }) => ({
                url: 'slots',
                method: 'POST',
                body: {
                    id,
                    slotName
                }
            }),
            invalidatesTags: [{ type: 'Slots', id: 'LIST'}]
        }),
        saveArray: build.mutation<any, buildObject & RandomProps>({
            query:({
                     name,
                       surname,
                    fullName,
                       hobbies,
                    slotId,
                    ...rest
                   }) => ({
                url: 'arrays',
                method: 'POST',
                body: {
                    name,
                    surname,
                    fullName,
                    hobbies,
                    slotId,
                    ...rest
                }
            }),
            invalidatesTags: [{ type: 'Arrays', id: 'DIST'}]
        }),
        getJsonById: build.query<ISlot, number>({
            query: (id) => `slots/${id}/?_embed=arrays`,
            providesTags: (result) => (result ? [{ type: 'Slots', id: 'LIST' }] : []),

        }),
        getArrays: build.query<buildObject & RandomProps[], number>({
            query: (id) => ({
                url: `arrays?slotId=${id}`,
            }),
            providesTags: (result: buildObject & RandomProps | undefined): readonly TagDescription<"Arrays">[] => {
                if (result && result.length > 0) {
                    return [
                        ...result.map(({ id }) => ({ type: 'Arrays' as const, id })),
                        { type: 'Arrays', id: 'DIST' },
                    ];
                } else {
                    return [{ type: 'Arrays', id: 'DIST' }];
                }
            },
        }),

        deleteSlot: build.mutation<void, number>({
            query: (id) => ({
                url: `slots/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Slots', id: 'LIST' }]
        }),

        deleteArray: build.mutation<void, number>({
            query: (id) => ({
                url: `arrays/${id}`,
                method: 'DELETE',
            }),
            invalidatesTags: [{ type: 'Arrays', id: 'DIST' }]
        }),

    })
})

export const {
    useSaveArrayMutation,
    useSaveSlotMutation,
    useGetSlotsQuery,
    useDeleteSlotMutation,
    useGetArraysQuery,
    useGetJsonByIdQuery,
    useDeleteArrayMutation
} = savedApi