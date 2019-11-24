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
                title="Discover your favourite movies, tv shows and games" 
                text="All in one place. Online library with more than 100 000 items. You will find here everything you want."
                />
                <div className="container-fluid mt-5">
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