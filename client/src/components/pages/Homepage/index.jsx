import React, { Component } from 'react';
import BrickTabs from '../../BrickTabs'
import Head from '../../common/Head'
import PageTitle from '../../common/PageTitle'
import PageHeader from '../../common/PageHeader'
import { 
    catalogTabs,
    moviesCollectionsTabs,
    tvCollectionsTabs,
    gamesCollectionsTabs
} from '../../../utils/tabs'

export default class Homepage extends Component {
    render() {
        return (
            <div className="mb-5">
                <Head title='Fiction finder - Collections' />
                <PageHeader 
                title="Explore your favourite movies, tv shows and games" 
                text="Fugiat eu consectetur culpa culpa. Pariatur in occaecat culpa quis. Ea elit minim anim do pariatur reprehenderit aute id velit magna."
                />
                <div className="container-fluid">
                    <BrickTabs path="catalog" main tabs={catalogTabs} />

                    <PageTitle title="Movies collections:" buttonBack={false} />
                    <BrickTabs path="collection/movies" tabs={moviesCollectionsTabs} />

                    <PageTitle title="TV shows collections:" buttonBack={false} />
                    <BrickTabs path="collection/tv" tabs={tvCollectionsTabs} />

                    <PageTitle title="Games collections:" buttonBack={false} />
                    <BrickTabs path="collection/games" tabs={gamesCollectionsTabs} />
                </div>
            </div>
        )
    }
}