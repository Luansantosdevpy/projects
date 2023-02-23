import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('projects')
export class Project {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    title: string;

    @Column()
    zip_code: string;

    @Column()
    cost: number;

    @Column()
    done: boolean;

    @Column({ type: 'date' })
    deadline: Date;

    @Column()
    username: string;

    @Column({ type: 'date' })
    created_at: Date;

    @Column({ type: 'date' })
    updated_at: Date;
}